import { Skill } from "../models/skill.model";
import {
  TSkill,
  TSkillCreateInput,
  TSkillUpdateInput,
} from "../types/skill.types";

export const createSkill = async (data: TSkillCreateInput): Promise<TSkill> => {
  const skill = await Skill.create(data);
  return skill.get() as TSkill;
};

export const getAllSkills = async (): Promise<TSkill[]> => {
  const skills = await Skill.findAll();
  return skills.map((s) => s.get() as TSkill);
};

export const getSkillById = async (id: number): Promise<TSkill | null> => {
  const skill = await Skill.findByPk(id);
  return skill ? (skill.get() as TSkill) : null;
};

export const updateSkill = async (
  id: number,
  data: TSkillUpdateInput
): Promise<TSkill | null> => {
  await Skill.update(data, { where: { id } });
  const updated = await Skill.findByPk(id);
  return updated ? (updated.get() as TSkill) : null;
};

export const deleteSkill = async (id: number): Promise<boolean> => {
  const deletedCount = await Skill.destroy({ where: { id } });
  return deletedCount > 0;
};
