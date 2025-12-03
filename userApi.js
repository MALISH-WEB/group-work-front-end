import api from "./axiosConfig";

export const getUserProfile = async (id) =>
  (await api.get(`/users/${id}`)).data;

export const updateProfile = async (id, data) =>
  (await api.put(`/users/${id}`, data)).data;

export const getUserProjects = async (id) =>
  (await api.get(`/users/${id}/projects`)).data;
