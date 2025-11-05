import { Router } from 'express';
import JobController from '../controllers/job.controller';
import { authenticate, requireRole } from '../middleware/auth.middleware';

const router = Router();

router.get('/', JobController.list);
router.get('/:id', JobController.details);

// only authenticated employer/admin
router.post('/', authenticate, requireRole(['admin', 'employer']), JobController.create);

// update/delete only by job poster or admin
router.put('/:id', authenticate, JobController.update);
router.delete('/:id', authenticate, JobController.delete);

export default router;
