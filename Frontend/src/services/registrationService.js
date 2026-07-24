import api from "./axios";

export const registerHackathon = (data) =>
  api.post("/registrations", data);

export const getMyRegistrations = () =>
  api.get("/registrations/my");

export const cancelRegistration = (id) =>
  api.delete(`/registrations/${id}`);