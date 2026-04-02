const { GameModel } = require("../models/GameModel");
const { ReviewModel } = require("../models/ReviewModel");
const { UserModel } = require("../models/UserModel");
const { sanitizeUser } = require("../utils/helpers");

const reviewController = {
  async postReview(req, res) {
    const gameId = Number(req.params.gameId);
    const { rating, comment } = req.body || {};

    if (!(await GameModel.getById(gameId))) {
      return res.status(404).json({ message: "Game not found" });
    }

    if (!rating || Number(rating) < 1 || Number(rating) > 5) {
      return res.status(400).json({ message: "rating must be between 1 and 5" });
    }

    const review = await ReviewModel.addReview(req.user.id, gameId, rating, comment);

    return res.status(201).json({
      message: "Review created",
      review: {
        ...review,
        user: sanitizeUser(await UserModel.findById(req.user.id)),
      },
    });
  },
};

module.exports = { reviewController };
