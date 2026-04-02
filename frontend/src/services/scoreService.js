import { api } from "./api.js";

export const scoreService = {
  async submitScore(gameId, score, duration) {
    const { data } = await api.post("/scores", { gameId, score, duration });
    return data;
  },
};
