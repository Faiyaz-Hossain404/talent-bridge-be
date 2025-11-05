import { Request, Response } from 'express';
import profileService from '../services/profile.service';

class ProfileController {
  async getMe(req: Request, res: Response) {
    try {
      const profile = await profileService.getMyProfile(req.user.id);
      return res.json({ success: true, data: profile });
    } catch (err: any) {
      return res.status(400).json({ success: false, message: err.message });
    }
  }

  async updateMe(req: Request, res: Response) {
    try {
      const profile = await profileService.updateMyProfile(req.user.id, req.body);
      return res.json({ success: true, data: profile, message: 'Profile updated' });
    } catch (err: any) {
      return res.status(400).json({ success: false, message: err.message });
    }
  }

  async adminGetAll(req: Request, res: Response) {
    try {
      const { page = 1, limit = 20 } = req.query;
      const profiles = await profileService.getAllProfiles(Number(page), Number(limit));
      return res.json({ success: true, data: profiles });
    } catch (err: any) {
      return res.status(400).json({ success: false, message: err.message });
    }
  }

  async adminGetOne(req: Request, res: Response) {
    try {
      const profile = await profileService.getProfileById(Number(req.params.id));
      return res.json({ success: true, data: profile });
    } catch (err: any) {
      return res.status(400).json({ success: false, message: err.message });
    }
  }
}

export default new ProfileController();
