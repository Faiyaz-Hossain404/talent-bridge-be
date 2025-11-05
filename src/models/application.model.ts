import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

export interface ApplicationAttributes {
  id?: number;
  user_id: number;
  job_id: number;
  status: string; // Applied, Reviewed, Shortlisted, Hired, Rejected
  created_at?: Date;
  updated_at?: Date;
}

export type ApplicationCreation = Optional<ApplicationAttributes, 'id'>;

export default (sequelize: Sequelize) => {
  const Application = sequelize.define<Model<ApplicationAttributes, ApplicationCreation>>(
    'Application',
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      job_id: { type: DataTypes.INTEGER, allowNull: false },
      status: {
        type: DataTypes.STRING,
        defaultValue: 'Applied'
      }
    },
    {
      tableName: 'applications',
      underscored: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );

  return Application;
};
