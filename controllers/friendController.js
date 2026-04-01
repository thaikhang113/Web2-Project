const { FriendshipModel } = require("../models/FriendshipModel");
const { UserModel } = require("../models/UserModel");
const {
	normalizeLimit,
	normalizePage,
	paginate,
	sanitizeUser,
} = require("../utils/helpers");

async function expandFriendship(friendship, currentUserId) {
	const friendId =
		friendship.requesterId === Number(currentUserId)
			? friendship.receiverId
			: friendship.requesterId;
	const friend = await UserModel.findById(friendId);

	return {
		...friendship,
		friend: sanitizeUser(friend),
	};
}

const friendController = {
	async getFriendsList(req, res) {
		const friendsPage = normalizePage(req.query.friendsPage, 1);
		const friendsLimit = normalizeLimit(req.query.friendsLimit, 6, 20);
		const pendingPage = normalizePage(req.query.pendingPage, 1);
		const pendingLimit = normalizeLimit(req.query.pendingLimit, 4, 20);

		const friends = await Promise.all(
			(await FriendshipModel.getFriends(req.user.id)).map((item) =>
				expandFriendship(item, req.user.id),
			),
		);

		const pending = await Promise.all(
			(await FriendshipModel.getPending(req.user.id)).map((item) =>
				expandFriendship(item, req.user.id),
			),
		);

		const friendsPayload = paginate(friends, friendsPage, friendsLimit);
		const pendingPayload = paginate(pending, pendingPage, pendingLimit);

		return res.json({
			friends: friendsPayload.items,
			pending: pendingPayload.items,
			friendsPagination: friendsPayload.pagination,
			pendingPagination: pendingPayload.pagination,
		});
	},

	async handleFriendRequest(req, res) {
		const { friendId, action } = req.body || {};

		if (!friendId || !action) {
			return res
				.status(400)
				.json({ message: "friendId and action are required" });
		}

		const targetUser = await UserModel.findById(friendId);
		if (!targetUser) {
			return res.status(404).json({ message: "Target user not found" });
		}

		if (Number(friendId) === req.user.id) {
			return res.status(400).json({ message: "Cannot friend yourself" });
		}

		if (action === "request") {
			const existing = await FriendshipModel.findFriendship(
				req.user.id,
				friendId,
			);
			if (existing) {
				return res
					.status(409)
					.json({ message: "Friendship already exists" });
			}

			const friendship = await FriendshipModel.requestFriend(
				req.user.id,
				friendId,
			);
			return res.status(201).json({
				message: "Friend request sent",
				friendship: await expandFriendship(friendship, req.user.id),
			});
		}

		if (action === "accept") {
			const friendship = await FriendshipModel.acceptFriend(
				req.user.id,
				friendId,
			);
			if (!friendship) {
				return res
					.status(404)
					.json({ message: "Pending request not found" });
			}

			return res.json({
				message: "Friend request accepted",
				friendship: await expandFriendship(friendship, req.user.id),
			});
		}

		return res.status(400).json({ message: "Unsupported action" });
	},
};

module.exports = { friendController };
