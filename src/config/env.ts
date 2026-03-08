import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

export const ENV = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 4000,

  db: {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
    name: process.env.DB_NAME || "employee_review_db",
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "pass",
  },

  jwt: {
    secret: process.env.JWT_SECRET || "defaultsecret",
    expiresIn: process.env.JWT_EXPIRES_IN || "1h",
  },
};
