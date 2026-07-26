import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { createUserByAdmin } from "../controllers/userController.js";

import {
  getProfile,
  updateProfile,
  getAllUsers,
  getUserById,
  blockUser,
  unblockUser,
  deleteUser,
  getJudges,
} from "../controllers/userController.js";

const router = express.Router();


router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);

router.get("/judges", authMiddleware, roleMiddleware("organizer", "admin"), getJudges);

router.get("/", authMiddleware, roleMiddleware("admin"), getAllUsers);

router.get("/:id", authMiddleware, roleMiddleware("admin"), getUserById);

router.put("/:id/block", authMiddleware, roleMiddleware("admin"), blockUser);

router.put(
  "/:id/unblock",
  authMiddleware,
  roleMiddleware("admin"),
  unblockUser,
);

router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteUser);

router.post(
  "/create-user",
  authMiddleware,
  roleMiddleware("admin"),
  createUserByAdmin,
);

export default router;
