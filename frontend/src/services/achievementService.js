import { api } from "./api.js";

export const achievementService = {
  async getMyAchievements() {
    const { data } = await api.get("/achievements");
    return data;
  },
};
