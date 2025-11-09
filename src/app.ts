import express from "express";
import routes from "./routes";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    credentials: false, // If you need to send cookies
  })
);

app.use(express.json());

app.get("/health", (_req, res) => res.status(200).json({ status: "ok" }));

app.use("/api", routes); // <— all routes under /api

export default app;

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzYyNTE3NjM5LCJleHAiOjE3NjI1MjEyMzl9.5OoyGvLsz5CSXIaO5f4M6-HpTqy_QK0PbsDIXlYPT-k

// PORT=4000
// NODE_ENV=development

// DB_HOST=localhost
// DB_PORT=5432
// DB_NAME=jobsdb
// DB_USER=postgres
// DB_PASSWORD=faiyaz699

// JWT_SECRET=b8e7fff948d70cd2da8059a0ad486eeb16db76c3291cb5b6ab0dd6ba139df038
// JWT_EXPIRES_IN=1h
