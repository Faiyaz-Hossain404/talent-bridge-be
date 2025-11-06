import { Router } from "express";
import {
  createSkillController,
  getAllSkillsController,
  deleteSkillController,
} from "../controllers/skill.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { requireAdmin } from "../middlewares/role.middleware";

const router = Router();

router.get("/", getAllSkillsController);

router.post("/", authenticate, requireAdmin, createSkillController);
router.delete("/:id", authenticate, requireAdmin, deleteSkillController);

export default router;
