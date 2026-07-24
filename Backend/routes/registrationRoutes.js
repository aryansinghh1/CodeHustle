import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

import {
  registerHackathon,
  getMyRegistrations,
  cancelRegistration,
  getHackathonRegistrations,
  approveRegistration,
  rejectRegistration,
} from "../controllers/registrationController.js";

const router = express.Router();

// Participant
router.post(
  "/",
  authMiddleware,
  roleMiddleware("participant"),
  registerHackathon
);

router.get(
  "/my",
  authMiddleware,
  roleMiddleware("participant"),
  getMyRegistrations
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("participant"),
  cancelRegistration
);

// Organizer
router.get(
  "/hackathon/:id",
  authMiddleware,
  roleMiddleware("organizer", "admin"),
  getHackathonRegistrations
);

router.put(
  "/:id/approve",
  authMiddleware,
  roleMiddleware("organizer", "admin"),
  approveRegistration
);

router.put(
  "/:id/reject",
  authMiddleware,
  roleMiddleware("organizer", "admin"),
  rejectRegistration
);

export default router;