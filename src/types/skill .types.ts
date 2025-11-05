// src/types/skill.types.ts

import { Optional, Model } from 'sequelize';

export interface SkillAttributes {
  id: number;
  name: string; // e.g., 'JavaScript', 'Python', 'React'
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SkillCreationAttributes extends Optional<SkillAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

// Define the Model type for use in the model definition file
export interface SkillModelType extends Model<SkillAttributes, SkillCreationAttributes>, SkillAttributes {}
