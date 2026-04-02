const { AchievementModel } = require("../models/AchievementModel");

const achievementController = {
  async getMyAchievements(req, res) {
    const achievements = await AchievementModel.getUserAchievements(
      req.user.id,
    );
    return res.json({ achievements });
  },
};

module.exports = { achievementController };
