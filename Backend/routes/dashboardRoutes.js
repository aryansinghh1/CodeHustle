import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

import {
  getAdminDashboard,
  getOrganizerDashboard,
  getParticipantDashboard,
  getJudgeDashboard,
} from "../controllers/dashboardController.js";

const router = express.Router();

router.get(
  "/admin",
  authMiddleware,
  roleMiddleware("admin"),
  getAdminDashboard
);

router.get(
  "/organizer",
  authMiddleware,
  roleMiddleware("organizer"),
  getOrganizerDashboard
);

router.get(
  "/participant",
  authMiddleware,
  roleMiddleware("participant"),
  getParticipantDashboard
);

router.get(
  "/judge",
  authMiddleware,
  roleMiddleware("judge"),
  getJudgeDashboard
);

export default router;

