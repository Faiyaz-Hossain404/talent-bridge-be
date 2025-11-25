import { Router } from "express";
import {
  getDashboardStatsController,
  adminGetRecentApplicantsController,
} from "../controllers/admin.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { requireAdmin } from "../middlewares/role.middleware";

const router = Router();

// Dashboard stats
router.get("/stats", authenticate, requireAdmin, getDashboardStatsController);

// Recent applicants
router.get(
  "/applications/recent",
  authenticate,
  requireAdmin,
  adminGetRecentApplicantsController
);

export default router;
