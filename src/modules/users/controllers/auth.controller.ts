import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import UserService from '../services/user.service';
import { HttpStatus } from '../../../utils/httpStatus';
import logger from '../../../config/logger';
import { EmailService } from '../../emails/services/email.service';

const userService = UserService.getInstance();

/**
 * Authentication Controller
 * Handles user authentication, registration and password management
 */
export class AuthController {
  /**
   * Authenticates user and generates JWT token
   * @param req Express request containing email and password
   * @param res Express response
   * @returns {Promise<Response>} JWT token and user data
   * @throws {Error} When credentials are invalid
   */
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await userService.getUserByEmail(email);
      if (!user) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          status: 'error',
          message: 'Invalid credentials',
        });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          status: 'error',
          message: 'Invalid credentials',
        });
      }

      if (user.user_status !== '1') {
        return res.status(HttpStatus.FORBIDDEN).json({
          status: 'error',
          message: 'Account is inactive',
        });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env['JWT_SECRET'] as string,
        {
          expiresIn: '24h',
        }
      );

      return res.status(HttpStatus.OK).json({
        status: 'success',
        data: {
          token,
          user: {
            id: user.id,
            email: user.email,
            display_name: user.display_name,
          },
        },
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: 'error',
        message: 'Login failed',
      });
    }
  }

  /**
   * Registers a new user in the system
   * @param req Express request containing user registration data
   * @param res Express response
   * @returns {Promise<Response>} Success message or error
   * @throws {Error} When registration fails or user exists
   */
  async register(req: Request, res: Response) {
    try {
      const { email } = req.body;

      const existingUser = await userService.getUserByEmail(email);
      if (existingUser) {
        return res.status(HttpStatus.CONFLICT).json({
          status: 'error',
          message: 'Email or username already exists',
        });
      }

      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = await userService.createUser({
        ...req.body,
        password: hashedPassword,
        user_registered: new Date(),
        user_status: '0',
      });

      // Generate 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const otp_expired_at = new Date(Date.now() + 30 * 60000); // 30 minutes expiry

      await userService.updateUser(newUser.id, {
        otp,
        otp_expired_at,
      });

      const emailService = new EmailService();
      await emailService.sendEmailByTrigger('EMAIL_VERIFICATION', email, {
        userName: newUser.username,
        veriCode: otp,
        verifyLink: `http://localhost:3000/verify/${newUser.id}/${otp}`,
        expire_in: '30',
      });

      await emailService.sendEmailByTrigger('WELCOME_REG_EMAIL', email, {
        userName: newUser.username,
        userEmail: newUser.email,
        regDate: new Date().toISOString().split('T')[0] as string,
      });

      logger.info(`Reset password email sent successfully to: ${email}`);

      return res.status(HttpStatus.CREATED).json({
        status: 'success',
        message: 'User registered successfully',
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: 'error',
        message: 'Registration failed',
      });
    }
  }

  /**
   * Handles the forgot password request
   * @param req Express Request object containing email in body
   * @param res Express Response object
   * @returns Promise<Response> JSON response with success/error message
   *
   * @throws {Error} When email sending fails
   * @throws {Error} When user lookup fails
   *
   * @example
   * POST /auth/forgot-password
   * body: { "email": "user@example.com" }
   */
  async forgotPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;
      logger.info(`Processing forgot password request for email: ${email}`);

      const user = await userService.getUserByEmail(email);
      if (!user) {
        logger.warn(`User not found for email: ${email}`);
        return res.status(404).json({ message: 'User not found' });
      }

      const resetToken = jwt.sign({ id: user.id }, process.env['JWT_SECRET'] as string, {
        expiresIn: '1h',
      });
      logger.debug('Reset token generated successfully');

      const resetLink = `${process.env['FRONTEND_URL']}/reset-password?token=${resetToken}`;

      const emailService = new EmailService();
      await emailService.sendEmailByTrigger('FORGOT_PASSWORD', email, {
        userName: user.display_name,
        resetLink: resetLink,
        expireIn: '60',
      });

      logger.info(`Reset password email sent successfully to: ${email}`);

      return res.json({ message: 'Password reset instructions sent to email' });
    } catch (error) {
      logger.error('Failed to process forgot password request', error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Error sending reset email' });
    }
  }

  /**
   * Resets the user's password
   * @param req Express Request object containing token and new password
   * @param res Express Response object
   * @returns Promise<Response> JSON response with success/error message
   * @throws {Error} When token is invalid or expired
   */
  async resetPassword(req: Request, res: Response) {
    try {
      const { token, password } = req.body;
      const decodedToken = jwt.verify(token, process.env['JWT_SECRET'] as string) as {
        id: number;
      };

      logger.info(`Resetting password for user with ID: ${decodedToken.id}`);
      const user = await userService.getUserById(decodedToken.id);
      if (!user) {
        logger.warn(`User not found for token: ${token}`);
        return res.status(HttpStatus.NOT_FOUND).json({ message: 'User not found' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await userService.updateUser(decodedToken.id, { password: hashedPassword });

      logger.info(`Password reset successful for user with ID: ${decodedToken.id}`);

      return res.status(HttpStatus.OK).json({ message: 'Password reset successful' });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: 'error',
        message: 'Password reset failed',
      });
    }
  }

  /**
   * Verifies the user's email
   * @param req Express Request object containing email and OTP
   * @param res Express Response object
   * @returns {Promise<Response>} Success message or error
   */
  async verifyEmail(req: Request, res: Response) {
    try {
      const { email, otp } = req.body;

      const user = await userService.getUserByEmail(email);
      if (!user) {
        return res.status(HttpStatus.NOT_FOUND).json({
          status: 'error',
          message: 'User not found',
        });
      }

      if (user.otp !== otp || new Date() > user.otp_expired_at!) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          status: 'error',
          message: 'Invalid or expired OTP',
        });
      }

      await userService.updateUser(user.id, {
        user_status: '1',
        otp: null,
        otp_expired_at: null,
      });

      return res.status(HttpStatus.OK).json({
        status: 'success',
        message: 'Email verified successfully',
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: 'error',
        message: 'Verification failed',
      });
    }
  }
}
