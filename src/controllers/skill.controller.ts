import { Request, Response } from "express";
import {
  createSkill,
  getAllSkills,
  getSkillById,
  updateSkill,
  deleteSkill,
} from "../services/skill.service";

export const createSkillController = async (req: Request, res: Response) => {
  const skill = await createSkill(req.body);
  res.json(skill);
};

export const getAllSkillsController = async (_req: Request, res: Response) => {
  const skills = await getAllSkills();
  res.json(skills);
};

export const getSkillByIdController = async (req: Request, res: Response) => {
  const skill = await getSkillById(Number(req.params.id));
  if (!skill) return res.status(404).json({ message: "Skill not found" });
  res.json(skill);
};

export const updateSkillController = async (req: Request, res: Response) => {
  const updated = await updateSkill(Number(req.params.id), req.body);
  if (!updated) return res.status(404).json({ message: "Skill not found" });
  res.json(updated);
};

export const deleteSkillController = async (req: Request, res: Response) => {
  const deleted = await deleteSkill(Number(req.params.id));
  if (!deleted) return res.status(404).json({ message: "Skill not found" });
  res.json({ message: "Skill deleted successfully" });
};
