import { api } from "./api.js";

export const gameService = {
  async getCatalog() {
    const { data } = await api.get("/games/catalog");
    return data;
  },
  async saveState(payload) {
    const { data } = await api.post("/games/save", payload);
    return data;
  },
  async loadState(gameId) {
    const { data } = await api.get(`/games/load/${gameId}`);
    return data;
  },
  async getReviews(gameId, params) {
    const { data } = await api.get(`/games/${gameId}/reviews`, { params });
    return data;
  },
  async postReview(gameId, payload) {
    const { data } = await api.post(`/games/${gameId}/reviews`, payload);
    return data;
  },
};
