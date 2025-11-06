import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";
import User from "./user.model";
import { TProfile } from "../types/profile.types";

type ProfileCreationAttributes = Optional<
  TProfile,
  "id" | "createdAt" | "updatedAt"
>;

class Profile
  extends Model<TProfile, ProfileCreationAttributes>
  implements TProfile
{
  public id!: number;
  public userId!: number;
  public fullName!: string;
  public phone?: string;
  public address?: string;
  public summary?: string;
  public experiences!: any[];
  public skills!: string[];
  public resumeUrl?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Profile.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      field: "user_id",
      references: { model: User, key: "id" },
    },

    fullName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: "full_name",
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "phone",
    },

    address: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "address",
    },

    summary: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "summary",
    },

    experiences: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: [],
    },

    skills: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: [],
    },

    resumeUrl: {
      type: DataTypes.STRING(255),
      field: "resume_url",
    },

    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "created_at",
    },

    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "updated_at",
    },
  },
  {
    sequelize,
    tableName: "profiles",
    timestamps: true,
  }
);

export default Profile;
