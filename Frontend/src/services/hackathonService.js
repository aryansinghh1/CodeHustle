import api from "./axios";

export const getHackathons = (params) =>
  api.get("/hackathons", { params });

export const getMyHackathons = () =>
  api.get("/hackathons/my");

export const getHackathonById = (id) =>
  api.get(`/hackathons/${id}`);

export const createHackathon = (data) =>
  api.post("/hackathons", data);

export const updateHackathon = (id, data) =>
  api.put(`/hackathons/${id}`, data);

export const deleteHackathon = (id) =>
  api.delete(`/hackathons/${id}`);