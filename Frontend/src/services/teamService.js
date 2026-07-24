import api from "./axios";

export const createTeam = (data) => api.post("/teams", data);

export const getMyTeams = () => api.get("/teams/my");

export const getTeamById = (id) => api.get(`/teams/${id}`);

export const updateTeam = (id, data) =>
  api.put(`/teams/${id}`, data);

export const deleteTeam = (id) =>
  api.delete(`/teams/${id}`);

export const joinTeam = (id) =>
  api.post(`/teams/${id}/join`);

export const leaveTeam = (id) =>
  api.delete(`/teams/${id}/leave`);