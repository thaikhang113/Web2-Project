import { api } from "./api.js";

export const rankingService = {
  async getRankings(gameId, params) {
    const { data } = await api.get(`/rankings/${gameId}`, { params });
    return data;
  },
};
