import { Router } from "express";
import {
  createProfileController,
  getAllProfilesController,
  getProfileByUserIdController,
  updateProfileController,
  deleteProfileController,
} from "../controllers/profile.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", authenticate, createProfileController);
router.get("/me", authenticate, getAllProfilesController);
router.get("/me/:id", authenticate, getProfileByUserIdController);
router.put("/me", authenticate, updateProfileController);
router.delete("/me", authenticate, deleteProfileController);

export default router;
