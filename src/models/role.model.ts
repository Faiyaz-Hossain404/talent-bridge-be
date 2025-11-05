import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

export interface RoleAttributes {
  id?: number;
  name: string;
  created_at?: Date;
  updated_at?: Date;
}

export type RoleCreationAttributes = Optional<RoleAttributes, 'id'>;

export default (sequelize: Sequelize) => {
  const Role = sequelize.define<Model<RoleAttributes, RoleCreationAttributes>>(
    'Role',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
      }
    },
    {
      tableName: 'roles',
      underscored: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );

  return Role;
};
