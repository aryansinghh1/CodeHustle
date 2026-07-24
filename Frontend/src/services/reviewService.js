import api from "./axios";

export const createReview = (data) =>
  api.post("/reviews", data);

export const getMyReviews = () =>
  api.get("/reviews/my");

export const getReviewById = (id) =>
  api.get(`/reviews/${id}`);

export const updateReview = (id, data) =>
  api.put(`/reviews/${id}`, data);

export const deleteReview = (id) =>
  api.delete(`/reviews/${id}`);

export const getSubmissionReviews = (submissionId) =>
  api.get(`/reviews/submission/${submissionId}`);