import rateLimit from 'express-rate-limit';
import logger from '../config/logger';
import { HttpStatus } from '../utils/httpStatus';

/**
 * Rate Limiter Configuration
 * Limits API requests based on IP address
 */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    status: 'error',
    message: 'Too many requests, please try again later.',
  },
  handler: (req, res, _next, options) => {
    logger.warn(`Rate limit exceeded for IP: ${req.ip}`);
    res.status(HttpStatus.LIMIT).json(options.message);
  },
});
/**
 * Strict Rate Limiter for Auth Routes
 * More restrictive limits for authentication endpoints
 */
export const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Limit each IP to 5 login attempts per hour
  message: {
    status: 'error',
    message: 'Too many login attempts, please try again after an hour',
  },
});
