import api from "./axiosConfig";

export const getProjects = async (filters = {}) =>
  (await api.get("/projects", { params: filters })).data;

export const createProject = async (data) =>
  (await api.post("/projects", data)).data;
