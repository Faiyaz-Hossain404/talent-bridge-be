import { Router } from 'express';
import authRoutes from './auth.routes';
import profileRoutes from './profile.routes';
import jobRoutes from './job.routes';
import applicationRoutes from './applicaiton.routes';

// import other routes similarly

const router = Router();

router.use('/auth', authRoutes);
router.use('/profile', profileRoutes);
router.use('/jobs', jobRoutes);
router.use('/applications', applicationRoutes);

export default router;
