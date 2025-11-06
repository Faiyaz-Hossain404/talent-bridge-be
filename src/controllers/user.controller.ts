import { Request, Response } from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../services/user.service";

export const createUserController = async (req: Request, res: Response) => {
  const user = await createUser(req.body);
  res.json(user);
};

export const getAllUsersController = async (_req: Request, res: Response) => {
  const users = await getAllUsers();
  res.json(users);
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
