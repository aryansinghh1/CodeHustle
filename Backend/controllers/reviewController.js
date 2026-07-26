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

  if (!submission) {
    return res.status(400).json({
      success: false,
      message: "Submission ID is required.",
    });
  }

  const targetSubmission = await Submission.findById(submission);
  if (!targetSubmission) {
    return res.status(404).json({
      success: false,
      message: "Submission not found.",
    });
  }

  const parseScore = (val) => {
    const num = Number(val);
    if (isNaN(num)) return 0;
    return Math.min(10, Math.max(0, num));
  };

  const innovationScore = parseScore(innovation);
  const technicalComplexityScore = parseScore(technicalComplexity);
  const userInterfaceScore = parseScore(userInterface);
  const functionalityScore = parseScore(functionality);
  const scalabilityScore = parseScore(scalability);
  const documentationScore = parseScore(documentation);
  const presentationScore = parseScore(presentation);

  const totalScore =
    innovationScore +
    technicalComplexityScore +
    userInterfaceScore +
    functionalityScore +
    scalabilityScore +
    documentationScore +
    presentationScore;

  const updateData = {
    innovation: innovationScore,
    technicalComplexity: technicalComplexityScore,
    userInterface: userInterfaceScore,
    functionality: functionalityScore,
    scalability: scalabilityScore,
    documentation: documentationScore,
    presentation: presentationScore,
    feedback: feedback || "",
    totalScore,
  };

  let review = await Review.findOne({
    judge: req.user._id,
    submission,
  });

  if (review) {
    Object.assign(review, updateData);
    await review.save();

    return res.status(200).json({
      success: true,
      message: "Review updated successfully.",
      review,
    });
  }

  try {
    review = await Review.create({
      judge: req.user._id,
      submission,
      ...updateData,
    });
  } catch (err) {
    if (err.code === 11000) {
      review = await Review.findOneAndUpdate(
        { judge: req.user._id, submission },
        updateData,
        { new: true }
      );
    } else {
      throw err;
    }
  }

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

