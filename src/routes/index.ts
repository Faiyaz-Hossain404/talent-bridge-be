import { Router } from 'express';
import authRoutes from './auth.routes.js';
import profileRoutes from './profile.routes.js';
import jobRoutes from './job.routes.js';
import applicationRoutes from './applicaiton.routes.js';

// import other routes similarly

const router = Router();

router.use('/auth', authRoutes);
router.use('/profile', profileRoutes);
router.use('/jobs', jobRoutes);
router.use('/applications', applicationRoutes);

export default router;
