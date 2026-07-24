import api from "./axios";

export const getLeaderboard = (hackathonId) =>
  api.get(`/leaderboard/${hackathonId}`);