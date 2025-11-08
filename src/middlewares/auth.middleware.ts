import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env";
import User from "../models/user.model";
import { TUser } from "../types/user.types";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, ENV.jwt.secret) as { id: number };

    const user = await User.findByPk(decoded.id);
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    req.user = user.get() as TUser;
    next();
  } catch (err: any) {
    console.error(err);

    if (err.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Token expired, please login again" });
    }

    return res.status(401).json({ message: "Invalid token" });
  }
};
