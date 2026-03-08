import { Router } from "express";
import {
  getAllUsersController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
  updateSelfUserController,
} from "../controllers/user.controller";

import { authenticate } from "../middlewares/auth.middleware";
import { requireAdmin } from "../middlewares/role.middleware";

const router = Router();

router.put("/me", authenticate, updateSelfUserController);

router.get("/", authenticate, requireAdmin, getAllUsersController);
router.get("/:id", authenticate, requireAdmin, getUserByIdController);
router.put("/:id", authenticate, requireAdmin, updateUserController);
router.delete("/:id", authenticate, requireAdmin, deleteUserController);

export default router;
//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzYzNDQ3NDQ5LCJleHAiOjE3NjM0NTEwNDl9.Pt4VQvBY16aI0ufzTUYfkwIh7JybcDpuAJWM_UbhMh8"
