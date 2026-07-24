import api from "./axios";

export const getAdminDashboard = () =>
  api.get("/dashboard/admin");

export const getOrganizerDashboard = () =>
  api.get("/dashboard/organizer");

export const getParticipantDashboard = () =>
  api.get("/dashboard/participant");

export const getJudgeDashboard = () =>
  api.get("/dashboard/judge");