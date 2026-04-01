const { FriendshipModel } = require("../models/FriendshipModel");
const { UserModel } = require("../models/UserModel");
const { sanitizeUser } = require("../utils/helpers");

const userController = {
  async getProfile(req, res) {
    const user = await UserModel.findById(req.user.id);
    return res.json({ user: sanitizeUser(user) });
  },

  async updateProfile(req, res) {
    const { username, bio, avatar } = req.body || {};
    const currentUser = await UserModel.findById(req.user.id);

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (username && username !== currentUser.username) {
      const existingUser = await UserModel.findByUsername(username);
      if (existingUser && existingUser.id !== currentUser.id) {
        return res.status(409).json({ message: "Username already exists" });
      }
    }

    const updatedUser = await UserModel.updateProfile(req.user.id, {
      username: username || currentUser.username,
      bio: bio ?? currentUser.bio,
      avatar: avatar || currentUser.avatar,
    });

    const friendCount = (await FriendshipModel.getFriendIds(updatedUser.id)).length;

    return res.json({
      message: "Profile updated",
      user: { ...sanitizeUser(updatedUser), friendCount },
    });
  },

  async searchUsers(req, res) {
    const query = req.query.search || "";
    const users = (await UserModel.searchUsers(query, req.user.id)).map(sanitizeUser);
    return res.json({ users });
  },
};

module.exports = { userController };
