import api from "./axiosConfig";   // 👈 USE default export

export const login = async (email, password) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

export const register = async (data) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};
