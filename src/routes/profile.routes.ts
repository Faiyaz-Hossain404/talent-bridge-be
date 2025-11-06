import { Router } from "express";
import {
  createProfileController,
  getAllProfilesController,
  getProfileByUserIdController,
  updateProfileController,
  deleteProfileController,
} from "../controllers/profile.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { requireAdmin } from "../middlewares/role.middleware";

const router = Router();

router.post("/", authenticate, createProfileController);
router.get("/me", authenticate, getProfileByUserIdController);
router.put("/me", authenticate, updateProfileController);
router.delete("/me", authenticate, deleteProfileController);

router.get("/", authenticate, requireAdmin, getAllProfilesController);
router.get("/:id", authenticate, requireAdmin, getProfileByUserIdController);

export default router;
