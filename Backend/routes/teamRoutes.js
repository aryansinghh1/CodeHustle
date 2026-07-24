import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

import {
  createTeam,
  getMyTeams,
  getTeamById,
  updateTeam,
  joinTeam,
  leaveTeam,
  removeMember,
  transferLeadership,
  deleteTeam,
} from "../controllers/teamController.js";

const router = express.Router();

router.post("/", authMiddleware, roleMiddleware("participant"), createTeam);

router.get("/my", authMiddleware, roleMiddleware("participant"), getMyTeams);

router.get("/:id", authMiddleware, getTeamById);

router.put("/:id", authMiddleware, roleMiddleware("participant"), updateTeam);

router.post("/:id/join", authMiddleware, roleMiddleware("participant"), joinTeam);

router.delete("/:id/leave", authMiddleware, roleMiddleware("participant"), leaveTeam);

router.delete(
  "/:id/member/:memberId",
  authMiddleware,
  roleMiddleware("participant"),
  removeMember
);

router.put(
  "/:id/transfer-leader",
  authMiddleware,
  roleMiddleware("participant"),
  transferLeadership
);

router.delete("/:id", authMiddleware, roleMiddleware("participant"), deleteTeam);

export default router;