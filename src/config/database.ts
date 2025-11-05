import { Sequelize } from "sequelize";
import { ENV } from "./env";

export const sequelize = new Sequelize({
  dialect: "postgres",
  host: ENV.db.host,
  port: ENV.db.port,
  database: ENV.db.name,
  username: ENV.db.user,
  password: ENV.db.password,
  logging: false,
});

export async function dbConnect() {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully");
  } catch (error) {
    console.log("Unable to connect to the database");
  }
}
