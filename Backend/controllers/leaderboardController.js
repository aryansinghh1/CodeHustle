import Review from "../models/Review.js";
import Submission from "../models/Submission.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getLeaderboard = asyncHandler(async (req, res) => {
  const { hackathonId } = req.params;

  const reviews = await Review.find()
    .populate({
      path: "submission",
      match: {
        hackathon: hackathonId,
      },
      populate: {
        path: "team",
      },
    });

  const leaderboardMap = {};

  reviews.forEach((review) => {
    if (!review.submission) return;

    const submissionId = review.submission._id.toString();

    if (!leaderboardMap[submissionId]) {
      leaderboardMap[submissionId] = {
        submissionId,
        projectName: review.submission.projectName,
        teamName: review.submission.team.teamName,
        totalScore: 0,
        reviews: 0,
      };
    }

    leaderboardMap[submissionId].totalScore += review.totalScore;
    leaderboardMap[submissionId].reviews++;
  });

  const leaderboard = Object.values(leaderboardMap)
    .map((item) => ({
      ...item,
      averageScore:
        item.reviews === 0
          ? 0
          : Number(
              (
                item.totalScore /
                item.reviews
              ).toFixed(2)
            ),
    }))
    .sort((a, b) => b.averageScore - a.averageScore)
    .map((item, index) => ({
      rank: index + 1,
      ...item,
    }));

  res.status(200).json({
    success: true,
    leaderboard,
  });
});