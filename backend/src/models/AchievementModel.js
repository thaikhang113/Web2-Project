const { db } = require("../config/db");
const { mapAchievement } = require("../utils/mappers");

const AchievementModel = {
  async getUserAchievements(userId) {
    const rows = await db("user_achievements as ua")
      .join("achievements as a", "a.id", "ua.achievement_id")
      .where("ua.user_id", Number(userId))
      .select("a.*", "ua.earned_at", "ua.id as user_achievement_id")
      .orderBy("ua.earned_at", "asc");

    return rows.map((row) => ({
      ...mapAchievement(row),
      earnedAt: row.earned_at,
      userAchievementId: row.user_achievement_id,
    }));
  },
};

module.exports = { AchievementModel };
