import { api } from "./api.js";

export const adminService = {
  async getStats() {
    const { data } = await api.get("/admin/stats");
    return data;
  },
  async getUsers() {
    const { data } = await api.get("/admin/users");
    return data;
  },
  async getGames() {
    const { data } = await api.get("/admin/games");
    return data;
  },
  async updateGame(gameId, payload) {
    const { data } = await api.put(`/admin/games/${gameId}`, payload);
    return data;
  },
};
