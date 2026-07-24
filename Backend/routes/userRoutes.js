import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

import {
  getProfile,
  updateProfile,
  getAllUsers,
  getUserById,
  blockUser,
  unblockUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

// Logged In User
router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);

// Admin Only
router.get("/", authMiddleware, roleMiddleware("admin"), getAllUsers);

router.get("/:id", authMiddleware, roleMiddleware("admin"), getUserById);

router.put("/:id/block", authMiddleware, roleMiddleware("admin"), blockUser);

router.put("/:id/unblock", authMiddleware, roleMiddleware("admin"), unblockUser);

router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteUser);

export default router;