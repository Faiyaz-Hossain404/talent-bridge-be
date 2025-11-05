import { Request, Response, NextFunction } from 'express';
import authService from '../services/auth.service.js';
import db from '../models/index.js';

const { User, Role } = db;

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ success: false, message: 'Unauthorized' });

    const [bearer, token] = header.split(' ');
    if (bearer !== 'Bearer' || !token) {
      return res.status(401).json({ success: false, message: 'Invalid token format' });
    }

    const payload = authService.verifyToken(token);

    const user = await User.findByPk(payload.id, {
      include: [{ model: Role, as: 'role' }]
    });

    if (!user) return res.status(401).json({ success: false, message: 'Unauthorized' });

    req.user = user;

    next();
  } catch (err: any) {
    res.status(401).json({ success: false, message: err.message || 'Unauthorized' });
  }
};

export const requireRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const roleName = req.user?.role?.name;
    if (!roles.includes(roleName)) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }
    next();
  };
};
