import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

import {
  createSubmission,
  getMySubmissions,
  getSubmissionById,
  updateSubmission,
  deleteSubmission,
  getHackathonSubmissions,
  getJudgeSubmissions,
} from "../controllers/submissionController.js";

const router = express.Router();

// Participant
router.post(
  "/",
  authMiddleware,
  roleMiddleware("participant"),
  createSubmission
);

router.get(
  "/my",
  authMiddleware,
  roleMiddleware("participant"),
  getMySubmissions
);

router.get(
  "/:id",
  authMiddleware,
  getSubmissionById
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("participant"),
  updateSubmission
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("participant"),
  deleteSubmission
);

// Organizer
router.get(
  "/hackathon/:id",
  authMiddleware,
  roleMiddleware("organizer", "admin"),
  getHackathonSubmissions
);

// Judge
router.get(
  "/judge",
  authMiddleware,
  roleMiddleware("judge"),
  getJudgeSubmissions
);

export default router;