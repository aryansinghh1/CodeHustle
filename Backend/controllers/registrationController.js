import Registration from "../models/Registration.js";
import Team from "../models/Team.js";
import Hackathon from "../models/Hackathon.js";
import asyncHandler from "../utils/asyncHandler.js";

export const registerHackathon = asyncHandler(async (req, res) => {
  const { hackathonId, teamId } = req.body;

  const hackathon = await Hackathon.findById(hackathonId);

  if (!hackathon) {
    return res.status(404).json({
      success: false,
      message: "Hackathon not found.",
    });
  }

  const team = await Team.findById(teamId);

  if (!team) {
    return res.status(404).json({
      success: false,
      message: "Team not found.",
    });
  }

  const existingRegistration = await Registration.findOne({
    hackathon: hackathonId,
    team: teamId,
  });

  if (existingRegistration) {
    return res.status(400).json({
      success: false,
      message: "Team already registered.",
    });
  }

  const registration = await Registration.create({
    hackathon: hackathonId,
    team: teamId,
  });

  res.status(201).json({
    success: true,
    message: "Registration submitted successfully.",
    registration,
  });
});


export const getMyRegistrations = asyncHandler(async (req, res) => {
  const teams = await Team.find({
    leader: req.user._id,
  });

  const teamIds = teams.map((team) => team._id);

  const registrations = await Registration.find({
    team: { $in: teamIds },
  })
    .populate("hackathon")
    .populate("team");

  res.status(200).json({
    success: true,
    registrations,
  });
});

export const cancelRegistration = asyncHandler(async (req, res) => {
  const registration = await Registration.findById(req.params.id);

  if (!registration) {
    return res.status(404).json({
      success: false,
      message: "Registration not found.",
    });
  }

  await registration.deleteOne();

  res.status(200).json({
    success: true,
    message: "Registration cancelled successfully.",
  });
});

export const getHackathonRegistrations = asyncHandler(async (req, res) => {
  const registrations = await Registration.find({
    hackathon: req.params.id,
  })
    .populate("team")
    .populate("hackathon");

  res.status(200).json({
    success: true,
    count: registrations.length,
    registrations,
  });
});

export const approveRegistration = asyncHandler(async (req, res) => {
  const registration = await Registration.findById(req.params.id);

  if (!registration) {
    return res.status(404).json({
      success: false,
      message: "Registration not found.",
    });
  }

  registration.status = "Approved";

  await registration.save();

  res.status(200).json({
    success: true,
    message: "Registration approved.",
  });
});

export const rejectRegistration = asyncHandler(async (req, res) => {
  const registration = await Registration.findById(req.params.id);

  if (!registration) {
    return res.status(404).json({
      success: false,
      message: "Registration not found.",
    });
  }

  registration.status = "Rejected";

  await registration.save();

  res.status(200).json({
    success: true,
    message: "Registration rejected.",
  });
});

