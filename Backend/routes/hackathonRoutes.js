import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

import {
  createHackathon,
  getAllHackathons,
  getHackathonById,
  updateHackathon,
  deleteHackathon,
} from "../controllers/hackathonController.js";

const router = express.Router();

// Public
router.get("/", getAllHackathons);
router.get("/:id", getHackathonById);

// Organizer/Admin
router.post(
  "/",
  authMiddleware,
  roleMiddleware("organizer", "admin"),
  createHackathon
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("organizer", "admin"),
  updateHackathon
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("organizer", "admin"),
  deleteHackathon
);

export default router;