import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

export interface ProfileAttributes {
  id?: number;
  user_id: number;
  headline?: string | null;
  bio?: string | null;
  phone?: string | null;
  resume_url?: string | null;
  created_at?: Date;
  updated_at?: Date;
}

export type ProfileCreationAttributes = Optional<ProfileAttributes, 'id'>;

export default (sequelize: Sequelize) => {
  const Profile = sequelize.define<Model<ProfileAttributes, ProfileCreationAttributes>>(
    'Profile',
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      headline: DataTypes.STRING,
      bio: DataTypes.TEXT,
      phone: DataTypes.STRING,
      resume_url: DataTypes.STRING(1000)
    },
    {
      tableName: 'profiles',
      underscored: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );

  return Profile;
};
