import Submission from "../models/Submission.js";
import Team from "../models/Team.js";
import Hackathon from "../models/Hackathon.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createSubmission = asyncHandler(async (req, res) => {
  const {
    team,
    hackathon,
    projectName,
    problemStatement,
    solution,
    description,
    githubRepo,
    liveDemo,
    techStack,
    screenshots,
    presentationPDF,
    demoVideo,
  } = req.body;

  const existingSubmission = await Submission.findOne({
    team,
    hackathon,
  });

  if (existingSubmission) {
    return res.status(400).json({
      success: false,
      message: "Submission already exists.",
    });
  }

  const submission = await Submission.create({
    team,
    hackathon,
    projectName,
    problemStatement,
    solution,
    description,
    githubRepo,
    liveDemo,
    techStack,
    screenshots,
    presentationPDF,
    demoVideo,
  });

  res.status(201).json({
    success: true,
    message: "Project submitted successfully.",
    submission,
  });
});

export const getMySubmissions = asyncHandler(async (req, res) => {
  const teams = await Team.find({
    members: req.user._id,
  });

  const teamIds = teams.map((team) => team._id);

  const submissions = await Submission.find({
    team: {
      $in: teamIds,
    },
  })
    .populate("team")
    .populate("hackathon");

  res.status(200).json({
    success: true,
    submissions,
  });
});

export const getSubmissionById = asyncHandler(async (req, res) => {
  const submission = await Submission.findById(req.params.id)
    .populate("team")
    .populate("hackathon");

  if (!submission) {
    return res.status(404).json({
      success: false,
      message: "Submission not found.",
    });
  }

  res.status(200).json({
    success: true,
    submission,
  });
});

export const updateSubmission = asyncHandler(async (req, res) => {
  const submission = await Submission.findById(req.params.id);

  if (!submission) {
    return res.status(404).json({
      success: false,
      message: "Submission not found.",
    });
  }

  Object.assign(submission, req.body);

  await submission.save();

  res.status(200).json({
    success: true,
    message: "Submission updated successfully.",
    submission,
  });
});

export const deleteSubmission = asyncHandler(async (req, res) => {
  const submission = await Submission.findById(req.params.id);

  if (!submission) {
    return res.status(404).json({
      success: false,
      message: "Submission not found.",
    });
  }

  await submission.deleteOne();

  res.status(200).json({
    success: true,
    message: "Submission deleted successfully.",
  });
});

export const getHackathonSubmissions = asyncHandler(async (req, res) => {
  const submissions = await Submission.find({
    hackathon: req.params.id,
  })
    .populate("team")
    .populate("hackathon");

  res.status(200).json({
    success: true,
    count: submissions.length,
    submissions,
  });
});

export const getJudgeSubmissions = asyncHandler(async (req, res) => {
  const assignedHackathons = await Hackathon.find({ judges: req.user._id });
  const hackathonIds = assignedHackathons.map((h) => h._id);

  const submissions = await Submission.find({
    hackathon: { $in: hackathonIds },
  })
    .populate("team")
    .populate("hackathon");

  res.status(200).json({
    success: true,
    submissions,
  });
});

