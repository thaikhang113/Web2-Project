const { db } = require("../config/db");
const { mapFriendship } = require("../utils/mappers");

const FriendshipModel = {
	async findFriendship(userId, friendId) {
		const row = await db("friendships")
			.where((builder) => {
				builder
					.where({
						requester_id: Number(userId),
						receiver_id: Number(friendId),
					})
					.orWhere({
						requester_id: Number(friendId),
						receiver_id: Number(userId),
					});
			})
			.first();
		return mapFriendship(row);
	},

	async requestFriend(userId, friendId) {
		const [row] = await db("friendships")
			.insert({
				requester_id: Number(userId),
				receiver_id: Number(friendId),
				status: "pending",
			})
			.returning("*");
		return mapFriendship(row);
	},

	async requestFriend(userId, friendId) {
		const [row] = await db("friendships")
			.insert({
				requester_id: Number(userId),
				receiver_id: Number(friendId),
				status: "pending",
			})
			.returning("*");

		return mapFriendship(row);
	},

	async acceptFriend(userId, friendId) {
		const [row] = await db("friendships")
			.where({
				requester_id: Number(friendId),
				receiver_id: Number(userId),
				status: "pending",
			})
			.update(
				{
					status: "accepted",
					updated_at: db.fn.now(),
				},
				"*",
			);

		return mapFriendship(row);
	},

	async getFriends(userId) {
		const rows = await db("friendships")
			.where({ status: "accepted" })
			.andWhere((builder) => {
				builder
					.where({ requester_id: Number(userId) })
					.orWhere({ receiver_id: Number(userId) });
			})
			.orderBy("updated_at", "desc");

		return rows.map(mapFriendship);
	},

	async getPending(userId) {
		const rows = await db("friendships")
			.where({ receiver_id: Number(userId), status: "pending" })
			.orderBy("created_at", "desc");

		return rows.map(mapFriendship);
	},

	async getFriendIds(userId) {
		const rows = await this.getFriends(userId);
		return rows.map((friendship) =>
			friendship.requesterId === Number(userId)
				? friendship.receiverId
				: friendship.requesterId,
		);
	},
};

module.exports = { FriendshipModel };
