import Team from "../models/Team.js";
import Hackathon from "../models/Hackathon.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createTeam = asyncHandler(async (req, res) => {
  const { teamName, hackathon, teamSize } = req.body;

  if (hackathon && teamSize) {
    const targetHackathon = await Hackathon.findById(hackathon);
    if (targetHackathon && Number(teamSize) > targetHackathon.maxTeamSize) {
      return res.status(400).json({
        success: false,
        message: `Team size cannot exceed hackathon maximum team size of ${targetHackathon.maxTeamSize}.`,
      });
    }
  }

  const team = await Team.create({
    teamName,
    leader: req.user._id,
    members: [req.user._id],
    hackathon,
    teamSize: teamSize ? Number(teamSize) : 1,
  });

  res.status(201).json({
    success: true,
    message: "Team created successfully.",
    team,
  });
});

export const getMyTeams = asyncHandler(async (req, res) => {
  const teams = await Team.find({
    members: req.user._id,
  })
    .populate("leader", "name email")
    .populate("members", "name email")
    .populate("hackathon", "title");

  res.status(200).json({
    success: true,
    teams,
  });
});

export const getTeamById = asyncHandler(async (req, res) => {
  const team = await Team.findById(req.params.id)
    .populate("leader", "name email")
    .populate("members", "name email")
    .populate("hackathon", "title");

  if (!team) {
    return res.status(404).json({
      success: false,
      message: "Team not found.",
    });
  }

  res.status(200).json({
    success: true,
    team,
  });
});

export const updateTeam = asyncHandler(async (req, res) => {
  const team = await Team.findById(req.params.id);

  if (!team) {
    return res.status(404).json({
      success: false,
      message: "Team not found.",
    });
  }

  if (team.leader.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: "Only team leader can update the team.",
    });
  }

  team.teamName = req.body.teamName || team.teamName;

  await team.save();

  res.status(200).json({
    success: true,
    message: "Team updated successfully.",
    team,
  });
});

export const joinTeam = asyncHandler(async (req, res) => {
  const team = await Team.findById(req.params.id);

  if (!team) {
    return res.status(404).json({
      success: false,
      message: "Team not found.",
    });
  }

  if (team.members.includes(req.user._id)) {
    return res.status(400).json({
      success: false,
      message: "Already a team member.",
    });
  }

  if (team.teamSize && team.members.length >= team.teamSize) {
    return res.status(400).json({
      success: false,
      message: "Team capacity reached. Cannot join full team.",
    });
  }

  team.members.push(req.user._id);

  await team.save();

  res.status(200).json({
    success: true,
    message: "Joined team successfully.",
  });
});

export const leaveTeam = asyncHandler(async (req, res) => {
  const team = await Team.findById(req.params.id);

  if (!team) {
    return res.status(404).json({
      success: false,
      message: "Team not found.",
    });
  }

  team.members = team.members.filter(
    (member) => member.toString() !== req.user._id.toString()
  );

  await team.save();

  res.status(200).json({
    success: true,
    message: "Left team successfully.",
  });
});

export const removeMember = asyncHandler(async (req, res) => {
  const team = await Team.findById(req.params.id);

  if (!team) {
    return res.status(404).json({
      success: false,
      message: "Team not found.",
    });
  }

  if (team.leader.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: "Only leader can remove members.",
    });
  }

  team.members = team.members.filter(
    (member) => member.toString() !== req.params.memberId
  );

  await team.save();

  res.status(200).json({
    success: true,
    message: "Member removed successfully.",
  });
});

export const transferLeadership = asyncHandler(async (req, res) => {
  const team = await Team.findById(req.params.id);

  if (!team) {
    return res.status(404).json({
      success: false,
      message: "Team not found.",
    });
  }

  if (team.leader.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: "Only leader can transfer leadership.",
    });
  }

  team.leader = req.body.newLeader;

  await team.save();

  res.status(200).json({
    success: true,
    message: "Leadership transferred successfully.",
  });
});

export const deleteTeam = asyncHandler(async (req, res) => {
  const team = await Team.findById(req.params.id);

  if (!team) {
    return res.status(404).json({
      success: false,
      message: "Team not found.",
    });
  }

  if (team.leader.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: "Only leader can delete the team.",
    });
  }

  await team.deleteOne();

  res.status(200).json({
    success: true,
    message: "Team deleted successfully.",
  });
});

