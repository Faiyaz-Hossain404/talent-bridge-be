import { Request, Response } from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateSelfUser,
} from "../services/user.service";

export const createUserController = async (req: Request, res: Response) => {
  const user = await createUser(req.body);
  res.json(user);
};

export const getAllUsersController = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;
  const search = (req.params.search as string) || "";
  const sort =
    (req.params.sort as "name_asc" | "name_desc" | "newest" | "oldest") ||
    "name_asc";

  const result = await getAllUsers(page, limit, { search, sort });
  res.json(result);
};

export const getUserByIdController = async (req: Request, res: Response) => {
  const user = await getUserById(Number(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

export const updateUserController = async (req: Request, res: Response) => {
  const updated = await updateUser(Number(req.params.id), req.body);
  if (!updated) return res.status(404).json({ message: "User not found" });
  res.json(updated);
};

export const deleteUserController = async (req: Request, res: Response) => {
  const deleted = await deleteUser(Number(req.params.id));
  if (!deleted) return res.status(404).json({ message: "User not found" });
  res.json({ message: "User deleted successfully" });
};

export const updateSelfUserController = async (req: Request, res: Response) => {
  try {
    const updated = await updateSelfUser(req.user!.id, req.body);
    if (!updated) return res.status(404).json({ message: "User not found" });
    res.json({ message: "Account updated successfully", user: updated });
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Update failed" });
  }
};
