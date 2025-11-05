import express from "express";
import { Request, Response } from "express";

const app = express();

app.use(express.json());

app.get("/health", (_req: Request, res: Response) => {
  return res.status(200).json({ status: "ok", message: "Server healthy" });
});

app.get("/", (_req: Request, res: Response) => {
  return res.send("Job Portal API is running...");
});

// app.get("/env", (_req: Request, res: Response) => {
//   res.json({ dbHost: process.env.DB_HOST, jwtSecret: process.env.JWT_SECRET });
// });

export default app;
