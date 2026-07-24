import api from "./axios";

export const createSubmission = (data) =>
  api.post("/submissions", data);

export const getMySubmissions = () =>
  api.get("/submissions/my");

export const getSubmissionById = (id) =>
  api.get(`/submissions/${id}`);

export const updateSubmission = (id, data) =>
  api.put(`/submissions/${id}`, data);

export const deleteSubmission = (id) =>
  api.delete(`/submissions/${id}`);

export const getHackathonSubmissions = (hackathonId) =>
  api.get(`/submissions/hackathon/${hackathonId}`);

export const getJudgeSubmissions = () =>
  api.get("/submissions/judge");