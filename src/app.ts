import express from "express";
import routes from "./routes";

const app = express();

app.use(express.json());

app.get("/health", (_req, res) => res.status(200).json({ status: "ok" }));

app.use("/api", routes); // <— all routes under /api

export default app;
