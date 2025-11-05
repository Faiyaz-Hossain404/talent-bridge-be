import { Router } from 'express';
import ApplicationController from '../controllers/application.controller';
import { authenticate, requireRole } from '../middleware/auth.middleware';

const router = Router();

// User applies
router.post('/', authenticate, requireRole(['user']), ApplicationController.apply);

// User sees their applications
router.get('/me', authenticate, ApplicationController.myApplications);

// Employer/Admin sees job applications
router.get('/job/:job_id', authenticate, requireRole(['admin', 'employer']), ApplicationController.jobApplications);

// Update Application Status
router.put('/status/:id', authenticate, requireRole(['admin', 'employer']), ApplicationController.updateStatus);

export default router;
