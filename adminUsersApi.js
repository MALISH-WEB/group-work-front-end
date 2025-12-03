import api from "./axiosConfig";

export const getAllUsers = async () =>
  (await api.get("/admin/users")).data;

export const updateUserRole = async (id, role) =>
  (await api.put(`/admin/users/${id}/role`, { role })).data;

export const deleteUser = async (id) =>
  (await api.delete(`/admin/users/${id}`)).data;
