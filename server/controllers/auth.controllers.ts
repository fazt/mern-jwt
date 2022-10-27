import { Request, Response } from "express";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import bcrypt from "bcryptjs";

export const register = async (req: Request, res: Response) => {
  // user data
  const { email, password } = req.body;

  // create new user
  const newUser = new User({
    email,
    password: await bcrypt.hash(password, 12),
  });

  // save user
  const savedUser = await newUser.save();

  // generate token
  jwt.sign({ id: savedUser.id }, JWT_SECRET, {}, (err, token) => {
    if (err) throw err;

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      // maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    });

    res.json({
      message: "User created successfully",
      email: savedUser.email,
      token,
    });
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // check if user exists
  const userFound = await User.findOne({ email });

  if (!userFound) return res.status(400).json({ message: "User not found" });

  // check password
  const passwordMatch = await bcrypt.compare(password, userFound.password);

  if (!passwordMatch)
    return res.status(400).json({ message: "Wrong password" });

  // generate token

  jwt.sign({ id: userFound.id }, JWT_SECRET, {}, (err, token) => {
    if (err) throw err;

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      // maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    });

    res.json({
      message: "User logged in successfully",
      email: userFound.email,
      token,
    });
  });
};
