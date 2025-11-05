import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

export interface JobAttributes {
  id?: number;
  title: string;
  description: string;
  location: string;
  salary_range?: string;
  status?: string;
  posted_by: number;
}

export type JobCreation = Optional<JobAttributes, 'id' | 'status'>;

export default (sequelize: Sequelize) => {
  const Job = sequelize.define<Model<JobAttributes, JobCreation>>(
    'Job',
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      title: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: false },
      location: { type: DataTypes.STRING, allowNull: false },
      salary_range: DataTypes.STRING,
      status: { type: DataTypes.STRING, defaultValue: 'Open' },
      posted_by: { type: DataTypes.INTEGER, allowNull: false }
    },
    {
      tableName: 'jobs',
      underscored: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );

  return Job;
};
