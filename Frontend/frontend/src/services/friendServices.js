import { api } from "./api.js";

export const friendService = {
	async getFriends(params) {
		const { data } = await api.get("/friends", { params });
		return data;
	},
	async sendRequest(friendId) {
		const { data } = await api.post("/friends", {
			friendId,
			action: "request",
		});
		return data;
	},
	async acceptRequest(friendId) {
		const { data } = await api.post("/friends", {
			friendId,
			action: "accept",
		});
		return data;
	},
};
