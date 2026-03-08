import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export interface IApplication {
  id?: number;
  jobId: number;
  userId: number;
  status?: string;
  appliedAt?: Date;
  coverLetter?: string | null;
  resumeUrl?: string | null;
  metadata?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export const Application = sequelize.define<Model<IApplication>>(
  "Application",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    jobId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "job_id",
      references: { model: "jobs", key: "id" },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "user_id",
      references: { model: "users", key: "id" },
    },
    status: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: "applied",
    },
    appliedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "applied_at",
      defaultValue: DataTypes.NOW,
    },
    coverLetter: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "cover_letter",
    },
    resumeUrl: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: "resume_url",
    },
    metadata: { type: DataTypes.TEXT, allowNull: true },
  },
  {
    tableName: "applications",
    timestamps: true,
    underscored: true,
  }
);
