import dotenv from "dotenv";
dotenv.config();

import { ENV } from "./config/env";
import app from "./app";
import { sequelize, dbConnect } from "./config/database";

async function startServer() {
  await dbConnect();
  await sequelize.sync({ alter: true });
  console.log("All models synchronized");

  app.listen(ENV.port, () => {
    console.log(
      `Server running at http://localhost:${ENV.port} [${ENV.nodeEnv}]`
    );
  });
}

startServer();
