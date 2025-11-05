import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

export interface AppStatusHistoryAttrs {
  id?: number;
  application_id: number;
  status: string;
  changed_by: number; // admin/employer ID
  created_at?: Date;
}

export type AppStatusHistoryCreate = Optional<AppStatusHistoryAttrs, 'id'>;

export default (sequelize: Sequelize) => {
  const ApplicationStatusHistory = sequelize.define<Model<AppStatusHistoryAttrs, AppStatusHistoryCreate>>(
    'ApplicationStatusHistory',
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      application_id: { type: DataTypes.INTEGER, allowNull: false },
      status: { type: DataTypes.STRING, allowNull: false },
      changed_by: { type: DataTypes.INTEGER, allowNull: false }
    },
    {
      tableName: 'application_status_history',
      underscored: true,
      timestamps: true,
      updatedAt: false,
      createdAt: 'created_at'
    }
  );

  return ApplicationStatusHistory;
};
