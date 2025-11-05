import { Request, Response } from 'express';
import authService from '../services/auth.service.js';

class AuthController {
  async register(req: Request, res: Response) {
    try {
      const user = await authService.register(req.body);
      return res.status(201).json({ success: true, data: user, message: 'Registered' });
    } catch (err: any) {
      return res.status(400).json({ success: false, message: err.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const result = await authService.login(req.body);
      return res.status(200).json({ success: true, data: result, message: 'Logged in' });
    } catch (err: any) {
      return res.status(400).json({ success: false, message: err.message });
    }
  }

  async me(req: Request, res: Response) {
    return res.json({ success: true, data: req.user });
  }
}

export default new AuthController();
