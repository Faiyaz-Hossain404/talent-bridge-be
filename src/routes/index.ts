import { Router } from "express";

import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import profileRoutes from "./profile.routes";
import jobRoutes from "./job.routes";
import applicationRoutes from "./application.routes";
import skillRoutes from "./skill.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/profiles", profileRoutes);
router.use("/jobs", jobRoutes);
router.use("/applications", applicationRoutes);
router.use("/skills", skillRoutes);

export default router;
