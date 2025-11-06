export interface TSkill {
  id?: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TSkillCreateInput {
  name: string;
}

export interface TSkillUpdateInput {
  name?: string;
}
