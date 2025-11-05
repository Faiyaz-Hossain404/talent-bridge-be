import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

export interface UserAttributes {
  id?: number;
  name: string;
  email: string;
  password: string;
  role_id: number;
  created_at?: Date;
  updated_at?: Date;
}

export type UserCreationAttributes = Optional<UserAttributes, 'id'>;

export default (sequelize: Sequelize) => {
  const User = sequelize.define<Model<UserAttributes, UserCreationAttributes>>(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      role_id: { type: DataTypes.INTEGER, allowNull: false }
    },
    {
      tableName: 'users',
      underscored: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      defaultScope: {
        attributes: { exclude: ['password'] }
      },
      scopes: {
        withPassword: {} // fetch password explicitly when logging in
      }
    }
  );

  return User;
};
