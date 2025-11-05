import { Sequelize } from 'sequelize';
import env from './env';

const sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASS, {
  host: env.DB_HOST,
  port: Number(env.DB_PORT) || 5432,
  dialect: 'postgres',
  logging: false,
  define: {
    underscored: true,
    freezeTableName: false
  }
});

export default sequelize;
