import api from "./axiosConfig";

export const getAnalytics = async () =>
  (await api.get("/analytics/dashboard")).data;
