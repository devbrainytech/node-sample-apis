import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface DecodedToken {
  id: string;
  role: string;
  iat: number;
  exp: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken;
    }
  }
}

/**
 * Middleware to verify JWT token
 * @description Middleware to verify JWT token
 * @param req
 * @param res
 * @param next
 * @returns void
 */
export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  if (!process.env['JWT_SECRET']) {
    res.status(500).json({ message: 'JWT_SECRET is not defined' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env['JWT_SECRET']) as DecodedToken;
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
  }
};

/**
 * Middleware to check user role
 * @description Middleware to check if the user has one of the allowed roles
 * @param allowedRoles Array of allowed roles
 * @returns Middleware function
 */
export const checkRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user?.role || !allowedRoles.includes(req.user.role)) {
      res.status(403).json({ message: 'Insufficient permissions' });
      return;
    }
    next();
  };
};
