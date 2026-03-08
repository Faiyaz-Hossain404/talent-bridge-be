import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export interface ISkill {
  id?: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const Skill = sequelize.define<Model<ISkill>>(
  "Skill",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "skills",
    timestamps: true,
    underscored: true,
  }
);
