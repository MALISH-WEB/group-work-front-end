import api from "./axiosConfig";

export const getComments = async (projectId) =>
  (await api.get(`/comments/${projectId}`)).data;

export const addComment = async (data) =>
  (await api.post(`/comments`, data)).data;
