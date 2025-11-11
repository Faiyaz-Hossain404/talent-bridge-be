import dotenv from "dotenv";
dotenv.config();

import { ENV } from "./config/env";
import app from "./app";
import { sequelize, dbConnect } from "./config/database";
import initAssociations from "./models";

async function startServer() {
  try {
    await dbConnect();
    initAssociations();
    await sequelize.sync({ alter: true });
    console.log("All models synchronized");

    app.listen(ENV.port, () => {
      console.log(
        `Server running at http://localhost:${ENV.port} [${ENV.nodeEnv}]`
      );
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1); // Exit with error code
  }
}

startServer();
