import { Router } from "express";
import {
  createJobController,
  getAllJobsController,
  getJobByIdController,
  updateJobController,
  deleteJobController,
} from "../controllers/job.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { requireAdmin } from "../middlewares/role.middleware";

const router = Router();

router.get("/", getAllJobsController);
router.get("/:id", getJobByIdController);

router.post("/", authenticate, requireAdmin, createJobController);
router.put("/:id", authenticate, requireAdmin, updateJobController);
router.delete("/:id", authenticate, requireAdmin, deleteJobController);

export default router;
