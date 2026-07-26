import api from "./axios";

export const getAllUsers = () =>
  api.get("/users");

export const getUserById = (id) =>
  api.get(`/users/${id}`);

export const blockUser = (id) =>
  api.put(`/users/${id}/block`);

export const unblockUser = (id) =>
  api.put(`/users/${id}/unblock`);

export const deleteUser = (id) =>
  api.delete(`/users/${id}`);

export const createUser = (data) =>
  api.post("/users/create-user", data);

export const getJudges = () =>
  api.get("/users/judges");