import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { HttpStatus } from '../../../utils/httpStatus';

/**
 * Validation schemas and middleware for authentication endpoints
 */

/**
 * Schema for login request validation
 * Requires email and password fields
 */
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const passwordSchema = Joi.object({
  token: Joi.string().required(),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .required(),
});

/**
 * Schema for forget password request validation
 * Requires email field
 */
const forgetPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

/**
 * Schema for user registration validation
 * Validates all required user fields with constraints
 */

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .required(),
  first_name: Joi.string().max(100),
  last_name: Joi.string().max(100),
  display_name: Joi.string().max(150).required(),
  gender: Joi.string().valid('male', 'female', 'other', 'prefer_not_to_say').required(),
  date_of_birth: Joi.date().required(),
  contact_no: Joi.string().max(20).required(),
  driving_licance: Joi.string().max(100).required(),
});

/**
 * Validates login request body
 * @param req Express request
 * @param res Express response
 * @param next Next middleware function
 * @returns Promise<void>
 */
export const validateLogin = (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    res.status(HttpStatus.BAD_REQUEST).json({ message: error.details[0]!.message });
    return Promise.resolve();
  }
  next();
  return Promise.resolve();
};

/**
 * Validates forget password request body
 * @param req Express request
 * @param res Express response
 * @param next Next middleware function
 * @returns Promise<void>
 */
export const validateForgatePassword = (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { error } = forgetPasswordSchema.validate(req.body);
  if (error) {
    res.status(HttpStatus.BAD_REQUEST).json({ message: error.details[0]!.message });
    return Promise.resolve();
  }
  next();
  return Promise.resolve();
};

/**
 * Validates registration request body
 * @param req Express request
 * @param res Express response
 * @param next Next middleware function
 * @returns Promise<void>
 */
export const validateRegister = (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    res.status(HttpStatus.BAD_REQUEST).json({ message: error.details[0]!.message });
    return Promise.resolve();
  }
  next();
  return Promise.resolve();
};

export const validateResetPassword = (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { error } = passwordSchema.validate(req.body);

  if (error) {
    res.status(HttpStatus.BAD_REQUEST).json({ message: error.details[0]!.message });
    return Promise.resolve();
  }
  next();
  return Promise.resolve();
};

export const verifyEmailSchema = (req: Request, res: Response, next: NextFunction) => {
  const { error } = Joi.object({
    email: Joi.string().email().required(),
    otp: Joi.string().length(6).required(),
  }).validate(req.body);
  if (error) {
    res.status(HttpStatus.BAD_REQUEST).json({ message: error.details[0]!.message });
    return Promise.resolve();
  }
  next();
  return Promise.resolve();
};
