import bcrypt from "bcrypt";
import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import generateToken from "../utils/generateToken.js";
import { MESSAGES } from "../constants/messages.js";

export const signup = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    role,
    college,
    bio,
    github,
    linkedin,
    skills,
  } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: MESSAGES.USER_EXISTS,
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
    college,
    bio,
    github,
    linkedin,
    skills,
  });

  const token = generateToken(user._id, user.role);

  res.status(201).json({
    success: true,
    message: MESSAGES.USER_CREATED,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({
      success: false,
      message: MESSAGES.INVALID_CREDENTIALS,
    });
  }

  if (user.isBlocked) {
    return res.status(403).json({
      success: false,
      message: "Your account has been blocked.",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: MESSAGES.INVALID_CREDENTIALS,
    });
  }

  const token = generateToken(user._id, user.role);

  res.status(200).json({
    success: true,
    message: MESSAGES.LOGIN_SUCCESS,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});