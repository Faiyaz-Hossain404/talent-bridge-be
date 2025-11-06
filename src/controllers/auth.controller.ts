import { Request, Response } from "express";
import { register, login } from "../services/auth.service";

export const registerController = async (req: Request, res: Response) => {
  try {
    const { name, email, password, roleId } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email and password are required" });
    }

    const user = await register({ name, email, password, roleId });

    return res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: error.message || "Registration failed" });
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const { user, token } = await login(email, password);

    return res.json({
      message: "Login successful",
      user,
      token,
    });
  } catch (error: any) {
    return res
      .status(401)
      .json({ message: error.message || "Invalid credentials" });
  }
};
