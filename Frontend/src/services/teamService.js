import api from "./axios";

export const createTeam = (data) =>
  api.post("/teams", data);

export const getMyTeams = () =>
  api.get("/teams/my");

export const getTeamById = (id) =>
  api.get(`/teams/${id}`);

export const updateTeam = (id, data) =>
  api.put(`/teams/${id}`, data);

export const deleteTeam = (id) =>
  api.delete(`/teams/${id}`);

export const joinTeam = (teamId) =>
  api.post(`/teams/${teamId}/join`);

export const leaveTeam = (teamId) =>
  api.post(`/teams/${teamId}/leave`);