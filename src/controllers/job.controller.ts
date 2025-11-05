import { Request, Response } from 'express';
import jobService from '../services/job.service';

class JobController {
  async list(req: Request, res: Response) {
    try {
      const { page = 1, limit = 20 } = req.query;
      const jobs = await jobService.listJobs(Number(page), Number(limit));
      return res.json({ success: true, data: jobs });
    } catch (err: any) {
      return res.status(400).json({ success: false, message: err.message });
    }
  }

  async details(req: Request, res: Response) {
    try {
      const job = await jobService.getJob(Number(req.params.id));
      return res.json({ success: true, data: job });
    } catch (err: any) {
      return res.status(400).json({ success: false, message: err.message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const job = await jobService.createJob(req.user.id, req.body);
      return res.status(201).json({ success: true, data: job, message: 'Job created' });
    } catch (err: any) {
      return res.status(400).json({ success: false, message: err.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const job = await jobService.updateJob(Number(req.params.id), req.user, req.body);
      return res.json({ success: true, data: job, message: 'Job updated' });
    } catch (err: any) {
      return res.status(400).json({ success: false, message: err.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await jobService.deleteJob(Number(req.params.id), req.user);
      return res.json({ success: true, message: 'Job deleted' });
    } catch (err: any) {
      return res.status(400).json({ success: false, message: err.message });
    }
  }
}

export default new JobController();
