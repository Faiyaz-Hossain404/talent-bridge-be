import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

export interface SkillAttributes {
  id?: number;
  name: string;
  created_at?: Date;
  updated_at?: Date;
}

export type SkillCreationAttributes = Optional<SkillAttributes, 'id' | 'created_at' | 'updated_at'>;

export default (sequelize: Sequelize) => {
  const Skill = sequelize.define<Model<SkillAttributes, SkillCreationAttributes>>(
    'Skill',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    },
    {
      tableName: 'skills',
      underscored: true,
      freezeTableName: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );

  return Skill;
};
