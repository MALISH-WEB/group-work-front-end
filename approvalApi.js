import api from "./axiosConfig";

export const getPendingProjects = async () =>
  (await api.get("/approvals/pending")).data;

export const approveProject = async (projectId) =>
  (await api.put(`/approvals/approve/${projectId}`)).data;

export const rejectProject = async (projectId, comment) =>
  (await api.put(`/approvals/reject/${projectId}`, { comment })).data;
