import Review from "../models/Review.js";
import Submission from "../models/Submission.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getLeaderboard = asyncHandler(async (req, res) => {
  const leaderboard = await Review.aggregate([
    {
      $lookup: {
        from: "submissions",
        localField: "submission",
        foreignField: "_id",
        as: "submission",
      },
    },

    {
      $unwind: "$submission",
    },

    {
      $match: {
        "submission.hackathon": req.params.hackathonId,
      },
    },

    {
      $group: {
        _id: "$submission.team",

        projectName: {
          $first: "$submission.projectName",
        },

        totalScore: {
          $sum: "$totalScore",
        },

        reviewCount: {
          $sum: 1,
        },
      },
    },

    {
      $sort: {
        totalScore: -1,
      },
    },
  ]);

  const rankedLeaderboard = leaderboard.map((team, index) => ({
    rank: index + 1,

    ...team,
  }));

  res.status(200).json({
    success: true,
    leaderboard: rankedLeaderboard,
  });
});

