import api from "./axios";

export const registerHackathon = (data) =>
  api.post("/registrations", data);

export const getMyRegistrations = () =>
  api.get("/registrations/my");

export const cancelRegistration = (id) =>
  api.delete(`/registrations/${id}`);

export const getHackathonRegistrations = (hackathonId) =>
  api.get(`/registrations/hackathon/${hackathonId}`);

export const approveRegistration = (id) =>
  api.put(`/registrations/${id}/approve`);

export const rejectRegistration = (id) =>
  api.put(`/registrations/${id}/reject`);