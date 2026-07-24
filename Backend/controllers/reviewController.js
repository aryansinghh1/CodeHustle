import Review from "../models/Review.js";
import Submission from "../models/Submission.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createReview = asyncHandler(async (req, res) => {
  const {
    submission,
    innovation,
    technicalComplexity,
    userInterface,
    functionality,
    scalability,
    documentation,
    presentation,
    feedback,
  } = req.body;

  const existingReview = await Review.findOne({
    judge: req.user._id,
    submission,
  });

  if (existingReview) {
    return res.status(400).json({
      success: false,
      message: "You have already reviewed this submission.",
    });
  }

  const review = await Review.create({
    judge: req.user._id,
    submission,
    innovation,
    technicalComplexity,
    userInterface,
    functionality,
    scalability,
    documentation,
    presentation,
    feedback,
  });

  res.status(201).json({
    success: true,
    message: "Review submitted successfully.",
    review,
  });
});

export const getMyReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({
    judge: req.user._id,
  })
    .populate("submission")
    .populate("judge", "name email");

  res.status(200).json({
    success: true,
    reviews,
  });
});

export const getReviewById = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id)
    .populate("submission")
    .populate("judge", "name email");

  if (!review) {
    return res.status(404).json({
      success: false,
      message: "Review not found.",
    });
  }

  res.status(200).json({
    success: true,
    review,
  });
});

export const updateReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return res.status(404).json({
      success: false,
      message: "Review not found.",
    });
  }

  Object.assign(review, req.body);

  await review.save();

  res.status(200).json({
    success: true,
    message: "Review updated successfully.",
    review,
  });
});

export const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return res.status(404).json({
      success: false,
      message: "Review not found.",
    });
  }

  await review.deleteOne();

  res.status(200).json({
    success: true,
    message: "Review deleted successfully.",
  });
});

export const getSubmissionReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({
    submission: req.params.submissionId,
  }).populate("judge", "name email");

  res.status(200).json({
    success: true,
    count: reviews.length,
    reviews,
  });
});

