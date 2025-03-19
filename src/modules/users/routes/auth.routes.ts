import { Router, Request, Response, RequestHandler } from 'express';
import { AuthController } from '../controllers/auth.controller';
import {
  validateForgatePassword,
  validateLogin,
  validateRegister,
  validateResetPassword,
  verifyEmailSchema,
} from '../validators/auth.validator';
import { apiLimiter, authLimiter } from '../../../middleware/rateLimiter';

const router = Router();
const controller = new AuthController();

const loginHandler: RequestHandler = async (req: Request, res: Response) => {
  await controller.login(req, res);
};

const registerHandler: RequestHandler = async (req: Request, res: Response) => {
  await controller.register(req, res);
};

const forgotPasswordHandler: RequestHandler = async (req: Request, res: Response) => {
  await controller.forgotPassword(req, res);
};

const resetPasswordHandler: RequestHandler = async (req: Request, res: Response) => {
  await controller.resetPassword(req, res);
};

const verifyEmail: RequestHandler = async (req: Request, res: Response) => {
  await controller.verifyEmail(req, res);
};

router.post('/login', authLimiter, validateLogin, loginHandler);
router.post('/register', apiLimiter, validateRegister, registerHandler);
router.post('/forgot-password', apiLimiter, validateForgatePassword, forgotPasswordHandler);
router.post('/reset-password', apiLimiter, validateResetPassword, resetPasswordHandler);
router.post('/verify-email', apiLimiter, verifyEmailSchema, verifyEmail);

export default router;
