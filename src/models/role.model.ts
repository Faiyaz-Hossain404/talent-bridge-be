import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";

const Role = sequelize.define(
  "Role",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  },
  { tableName: "roles", timestamps: true }
);

export default Role;
