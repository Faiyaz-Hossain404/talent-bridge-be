import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export interface IJob {
  id?: number;
  userId: number;
  title: string;
  company: string;
  location?: string | null;
  employmentType?: string | null;
  salaryRange?: string | null;
  shortDescription?: string | null;
  responsibilities?: string | null;
  requirements?: string | null;
  benefits?: string | null;
  deadline?: string | null;
  statusOptions?: any; // jsonb
  hiringStatus?: string | null;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export const Job = sequelize.define<Model<IJob>>(
  "Job",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "user_id",
      references: { model: "users", key: "id" },
    },
    title: { type: DataTypes.STRING(255), allowNull: false },
    company: { type: DataTypes.STRING(255), allowNull: false },
    location: { type: DataTypes.STRING(255), allowNull: true },
    employmentType: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: "employment_type",
    },
    salaryRange: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: "salary_range",
    },
    shortDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "short_description",
    },
    responsibilities: { type: DataTypes.TEXT, allowNull: true },
    requirements: { type: DataTypes.TEXT, allowNull: true },
    benefits: { type: DataTypes.TEXT, allowNull: true },
    deadline: { type: DataTypes.DATEONLY, allowNull: true },
    statusOptions: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: ["hiring", "applied"],
      field: "status_options",
    },
    hiringStatus: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: "hiring",
      field: "hiring_status",
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: "is_active",
    },
  },
  {
    tableName: "jobs",
    timestamps: true,
    underscored: true,
  }
);
