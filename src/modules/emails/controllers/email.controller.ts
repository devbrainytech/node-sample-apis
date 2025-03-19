import { Request, Response } from 'express';
import { EmailService } from '../services/email.service';
import { HttpStatus } from 'utils/httpStatus';
import logger from 'config/logger';

/**
 * Controller for handling email-related requests.
 * @class EmailController
 * @param {EmailService} emailService - The email service instance.
 * @constructor
 * @returns {EmailController} The email controller instance.
 */
export class EmailController {
  private emailService: EmailService;

  constructor() {
    this.emailService = new EmailService();
  }

  /**
   * Sends an email using the email service.
   * @param {Request} req - The HTTP request object.
   * @param {Response} res - The HTTP response object.
   * @returns {Promise<void>} A promise that resolves when the email is sent.
   */
  async sendEmail(req: Request, res: Response) {
    try {
      const { action, email, variables } = req.body;

      logger.info(`Sending email for action: ${action} to recipient: ${email}`, {
        action,
        email,
        variables,
      });

      await this.emailService.sendEmailByTrigger(action, email, variables);

      logger.info(`Email sent successfully for action: ${action} to recipient: ${email}`);

      return res.status(HttpStatus.OK).json({
        status: 'success',
        message: 'Email sent successfully',
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        logger.error(`Failed to send email: ${error.message}`, {
          error,
          stack: error.stack,
        });
      } else {
        logger.error('Failed to send email: Unknown error');
      }

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: 'error',
        message: 'Failed to send email',
      });
    }
  }
}
