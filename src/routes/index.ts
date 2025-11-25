import { Router } from "express";

import authRoutes from "./auth.routes";
import adminRoutes from "./admin.routes";
import userRoutes from "./user.routes";
import profileRoutes from "./profile.routes";
import jobRoutes from "./job.routes";
import applicationRoutes from "./application.routes";
import skillRoutes from "./skill.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);
router.use("/users", userRoutes);
router.use("/profiles", profileRoutes);
router.use("/jobs", jobRoutes);
router.use("/applications", applicationRoutes);
router.use("/skills", skillRoutes);

export default router;
