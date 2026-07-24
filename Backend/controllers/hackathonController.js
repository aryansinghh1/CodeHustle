import Hackathon from "../models/Hackathon.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createHackathon = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    theme,
    mode,
    venue,
    startDate,
    endDate,
    registrationDeadline,
    bannerImage,
    prizePool,
    maxTeamSize,
    rules,
    judgingCriteria,
  } = req.body;

  const registrationDate = new Date(registrationDeadline);
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (registrationDate >= start) {
    return res.status(400).json({
      success: false,
      message: "Registration deadline must be before the start date.",
    });
  }

  if (start >= end) {
    return res.status(400).json({
      success: false,
      message: "End date must be after the start date.",
    });
  }

  const existingHackathon = await Hackathon.findOne({
    title,
    organizer: req.user._id,
  });

  if (existingHackathon) {
    return res.status(400).json({
      success: false,
      message: "Hackathon with this title already exists.",
    });
  }

  const hackathon = await Hackathon.create({
    title,
    description,
    theme,
    mode,
    venue,
    startDate,
    endDate,
    registrationDeadline,
    bannerImage,
    prizePool,
    maxTeamSize,
    rules,
    judgingCriteria,

    organizer: req.user._id,
  });

  res.status(201).json({
    success: true,
    message: "Hackathon created successfully.",
    hackathon,
  });
});

export const getAllHackathons = asyncHandler(async (req, res) => {
  const { search, theme, mode, status, page = 1, limit = 10 } = req.query;

  const query = {};

  if (search) {
    query.title = {
      $regex: search,
      $options: "i",
    };
  }

  if (theme) {
    query.theme = theme;
  }

  if (mode) {
    query.mode = mode;
  }

  if (status) {
    query.status = status;
  }

  const total = await Hackathon.countDocuments(query);

  const hackathons = await Hackathon.find(query)
    .populate("organizer", "name email")
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    total,

    currentPage: Number(page),

    totalPages: Math.ceil(total / limit),

    hackathons,
  });
});

export const getHackathonById = asyncHandler(async (req, res) => {
  const hackathon = await Hackathon.findById(req.params.id)
    .populate("organizer", "name email")
    .populate("judges", "name email");

  if (!hackathon) {
    return res.status(404).json({
      success: false,
      message: "Hackathon not found.",
    });
  }

  res.status(200).json({
    success: true,
    hackathon,
  });
});

export const updateHackathon = asyncHandler(async (req, res) => {
  const hackathon = await Hackathon.findById(req.params.id);

  if (!hackathon) {
    return res.status(404).json({
      success: false,
      message: "Hackathon not found.",
    });
  }

  if (
    hackathon.organizer.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    return res.status(403).json({
      success: false,
      message: "Access denied.",
    });
  }

  const allowedFields = [
    "title",
    "description",
    "theme",
    "mode",
    "venue",
    "startDate",
    "endDate",
    "registrationDeadline",
    "bannerImage",
    "prizePool",
    "maxTeamSize",
    "rules",
    "judgingCriteria",
  ];

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      hackathon[field] = req.body[field];
    }
  });

  await hackathon.save();

  res.status(200).json({
    success: true,
    message: "Hackathon updated successfully.",
    hackathon,
  });
});

export const deleteHackathon = asyncHandler(async (req, res) => {
  const hackathon = await Hackathon.findById(req.params.id);

  if (!hackathon) {
    return res.status(404).json({
      success: false,
      message: "Hackathon not found.",
    });
  }

  if (
    hackathon.organizer.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    return res.status(403).json({
      success: false,
      message: "Access denied.",
    });
  }

  await hackathon.deleteOne();

  res.status(200).json({
    success: true,
    message: "Hackathon deleted successfully.",
  });
});

export const getMyHackathons = asyncHandler(async (req, res) => {

  const hackathons = await Hackathon.find({
    organizer: req.user._id,
  }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: hackathons.length,
    hackathons,
  });

});