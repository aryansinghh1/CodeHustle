import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

import {
  createReview,
  getMyReviews,
  getReviewById,
  updateReview,
  deleteReview,
  getSubmissionReviews,
} from "../controllers/reviewController.js";

const router = express.Router();

// Judge
router.post(
  "/",
  authMiddleware,
  roleMiddleware("judge"),
  createReview
);

router.get(
  "/my",
  authMiddleware,
  roleMiddleware("judge"),
  getMyReviews
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("judge"),
  updateReview
);

// Judge/Admin
router.get(
  "/:id",
  authMiddleware,
  roleMiddleware("judge", "admin"),
  getReviewById
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("judge", "admin"),
  deleteReview
);

// Organizer/Admin
router.get(
  "/submission/:submissionId",
  authMiddleware,
  roleMiddleware("organizer", "admin"),
  getSubmissionReviews
);

export default router;