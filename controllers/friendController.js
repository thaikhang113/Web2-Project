const { FriendshipModel } = require("../models/FriendshipModel");
const { normalizeLimit, normalizePage, paginate } = require("../utils/helpers");

const friendController = {
	async getFriendsList(req, res) {
		const friendsPage = normalizePage(req.query.friendsPage, 1);
		const friendsLimit = normalizeLimit(req.query.friendsLimit, 6, 20);
		const pendingPage = normalizePage(req.query.pendingPage, 1);
		const pendingLimit = normalizeLimit(req.query.pendingLimit, 4, 20);

		const friends = await FriendshipModel.getFriends(req.user.id);
		const pending = await FriendshipModel.getPending(req.user.id);

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
				friendship,
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
				friendship,
			});
		}

		return res.status(400).json({ message: "Unsupported action" });
	},
};

module.exports = { friendController };
