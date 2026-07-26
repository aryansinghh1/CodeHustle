import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";

// Get Logged In User Profile
export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  res.status(200).json({
    success: true,
    user,
  });
});

// Update Logged In User Profile
export const updateProfile = asyncHandler(async (req, res) => {
  const { name, college, bio, github, linkedin, skills, profileImage } =
    req.body;

  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  user.name = name ?? user.name;
  user.college = college ?? user.college;
  user.bio = bio ?? user.bio;
  user.github = github ?? user.github;
  user.linkedin = linkedin ?? user.linkedin;
  user.skills = skills ?? user.skills;
  user.profileImage = profileImage ?? user.profileImage;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Profile updated successfully.",
    user,
  });
});

// Get All Users (Admin)
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");

  res.status(200).json({
    success: true,
    count: users.length,
    users,
  });
});

// Get User By ID
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// Block User
export const blockUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  user.isBlocked = true;

  await user.save();

  res.status(200).json({
    success: true,
    message: "User blocked successfully.",
  });
});

// Unblock User
export const unblockUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  user.isBlocked = false;

  await user.save();

  res.status(200).json({
    success: true,
    message: "User unblocked successfully.",
  });
});

// Delete User
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  await user.deleteOne();

  res.status(200).json({
    success: true,
    message: "User deleted successfully.",
  });
});

export const createUserByAdmin = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!["organizer", "judge", "admin"].includes(role)) {
    return res.status(400).json({
      success: false,
      message: "Invalid role.",
    });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User already exists.",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  res.status(201).json({
    success: true,
    message: `${role} created successfully.`,
    user,
  });
});

export const getJudges = asyncHandler(async (req, res) => {
  const judges = await User.find({ role: "judge" }).select("_id name email");

  res.status(200).json({
    success: true,
    count: judges.length,
    judges,
  });
});