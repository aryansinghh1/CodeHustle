import User from "../models/User.js";
import Hackathon from "../models/Hackathon.js";
import Team from "../models/Team.js";
import Submission from "../models/Submission.js";
import Review from "../models/Review.js";
import Registration from "../models/Registration.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getAdminDashboard = asyncHandler(async (req, res) => {
  const totalUsers = await User.countDocuments();

  const totalHackathons = await Hackathon.countDocuments();

  const totalTeams = await Team.countDocuments();

  const totalSubmissions = await Submission.countDocuments();

  const totalReviews = await Review.countDocuments();

  const totalOrganizers = await User.countDocuments({
    role: "organizer",
  });

  const totalJudges = await User.countDocuments({
    role: "judge",
  });

  const totalParticipants = await User.countDocuments({
    role: "participant",
  });

  res.status(200).json({
    success: true,
    dashboard: {
      totalUsers,
      totalHackathons,
      totalTeams,
      totalSubmissions,
      totalReviews,
      totalOrganizers,
      totalJudges,
      totalParticipants,
    },
  });
});

export const getOrganizerDashboard = asyncHandler(async (req, res) => {
  const myHackathons = await Hackathon.find({
    organizer: req.user._id,
  });

  const hackathonIds = myHackathons.map((hackathon) => hackathon._id);

  const registrations = await Registration.countDocuments({
    hackathon: { $in: hackathonIds },
  });

  const submissions = await Submission.countDocuments({
    hackathon: { $in: hackathonIds },
  });

  const completedHackathons = myHackathons.filter(
    (hackathon) => hackathon.status === "Completed"
  ).length;

  const upcomingHackathons = myHackathons.filter(
    (hackathon) => hackathon.status === "Upcoming"
  ).length;

  res.status(200).json({
    success: true,
    dashboard: {
      myHackathons: myHackathons.length,
      registrations,
      submissions,
      completedHackathons,
      upcomingHackathons,
    },
  });
});

export const getParticipantDashboard = asyncHandler(async (req, res) => {
  const myTeams = await Team.find({
    members: req.user._id,
  });

  const teamIds = myTeams.map((team) => team._id);

  const registeredHackathons = await Registration.countDocuments({
    team: { $in: teamIds },
  });

  const submissions = await Submission.countDocuments({
    team: { $in: teamIds },
  });

  const submissionIds = (
    await Submission.find({
      team: { $in: teamIds },
    })
  ).map((submission) => submission._id);

  const reviewsReceived = await Review.countDocuments({
    submission: { $in: submissionIds },
  });

  res.status(200).json({
    success: true,
    dashboard: {
      myTeams: myTeams.length,
      registeredHackathons,
      submissions,
      reviewsReceived,
    },
  });
});

export const getJudgeDashboard = asyncHandler(async (req, res) => {
  const completedReviewsCount = await Review.countDocuments({
    judge: req.user._id,
  });

  const assignedHackathons = await Hackathon.find({ judges: req.user._id });
  const hackathonIds = assignedHackathons.map((h) => h._id);

  const totalAssignedProjects = await Submission.countDocuments({
    hackathon: { $in: hackathonIds },
  });

  const pendingReviewsCount = Math.max(0, totalAssignedProjects - completedReviewsCount);

  res.status(200).json({
    success: true,
    dashboard: {
      assignedProjects: totalAssignedProjects,
      completedReviews: completedReviewsCount,
      pendingReviews: pendingReviewsCount,
    },
  });
});

