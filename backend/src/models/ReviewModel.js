const { db } = require("../config/db");
const { mapReview } = require("../utils/mappers");

const ReviewModel = {
  async addReview(userId, gameId, rating, comment) {
    const [row] = await db("reviews")
      .insert({
        user_id: Number(userId),
        game_id: Number(gameId),
        rating: Number(rating),
        comment: String(comment || ""),
      })
      .onConflict(["user_id", "game_id"])
      .merge({
        rating: Number(rating),
        comment: String(comment || ""),
        updated_at: db.fn.now(),
      })
      .returning("*");

    return mapReview(row);
  },

  async getGameReviews(gameId) {
    const rows = await db("reviews")
      .where({ game_id: Number(gameId) })
      .select("*")
      .orderBy("updated_at", "desc");

    return rows.map(mapReview);
  },
};

module.exports = { ReviewModel };
