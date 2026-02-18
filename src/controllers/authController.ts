import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { registerSchema } from "../validators/authValidator";

export const register = async (req: Request, res: Response) => {
  try {
    const data = registerSchema.parse(req.body);
    const existing = await User.findOne({ email: data.email });
    if (existing) {
      return res.status(409).json({ message: "Email already exists" });
    }
    data.password = await bcrypt.hash(data.password, 10);
    const user = await User.create(data);
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET!,
      { expiresIn: "24h" }
    );
    return res.status(201).json({ token });
  } catch (err) {
    return res.status(400).json({ message: "Invalid request" });
  }
};
