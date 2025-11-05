import { Request, Response } from 'express';
import appService from '../services/application.service.js';

class ApplicationController {
  async apply(req: Request, res: Response) {
    try {
      const app = await appService.apply(req.user.id, req.body.job_id);
      res.json({ success: true, data: app, message: 'Applied successfully' });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  async myApplications(req: Request, res: Response) {
    const apps = await appService.listMyApplications(req.user.id);
    res.json({ success: true, data: apps });
  }

  async jobApplications(req: Request, res: Response) {
    try {
      const apps = await appService.listApplicationsForJob(Number(req.params.job_id), req.user.id);
      res.json({ success: true, data: apps });
    } catch (err: any) {
      res.status(403).json({ success: false, message: err.message });
    }
  }

  async updateStatus(req: Request, res: Response) {
    try {
      const updated = await appService.updateStatus(Number(req.params.id), req.body.status, req.user.id);
      res.json({ success: true, data: updated });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }
}

export default new ApplicationController();
