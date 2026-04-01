import { api } from "./api.js";

export const userService = {
  async getProfile() {
    const { data } = await api.get("/users/profile");
    return data;
  },
  async updateProfile(payload) {
    const { data } = await api.put("/users/profile", payload);
    return data;
  },
  async searchUsers(search) {
    const { data } = await api.get("/users", { params: { search } });
    return data;
  },
};
