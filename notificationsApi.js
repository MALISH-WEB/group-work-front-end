import api from "./axiosConfig";

export const getNotifications = async (userId) =>
  (await api.get(`/notifications/${userId}`)).data;

export const markNotificationRead = async (id) =>
  (await api.put(`/notifications/read/${id}`)).data;
