import { Router } from 'express';
import ProfileController from '../controllers/profile.controller.js';
import { authenticate, requireRole } from '../middlewares/auth.middleware.js';

const router = Router();

// User routes
router.get('/me', authenticate, ProfileController.getMe);
router.put('/', authenticate, ProfileController.updateMe);

// Admin routes
router.get('/all', authenticate, requireRole(['admin']), ProfileController.adminGetAll);

router.get('/:id', authenticate, requireRole(['admin']), ProfileController.adminGetOne);

export default router;
