import { Router } from "express";
import {
  applyJob,
  getMyApplications,
  adminUpdateApplicationStatus,
  adminListApplicationsController,
} from "../controllers/application.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { requireAdmin } from "../middlewares/role.middleware";

const router = Router();

router.post("/", authenticate, applyJob);

router.get("/me", authenticate, getMyApplications);

//admin
router.get("/", authenticate, requireAdmin, adminListApplicationsController);

router.put("/:id", authenticate, requireAdmin, adminUpdateApplicationStatus);

export default router;
