import { Router } from "express";
import {
  createJobController,
  getAllJobsController,
  getJobByIdController,
  updateJobController,
  deleteJobController,
} from "../controllers/job.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", getAllJobsController);
router.get("/:id", getJobByIdController);

router.post("/", authenticate, createJobController);
router.put("/:id", authenticate, updateJobController);
router.delete("/:id", authenticate, deleteJobController);

export default router;
