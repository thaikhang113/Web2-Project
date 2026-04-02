const { GameModel } = require("../models/GameModel");
const { GameStateModel } = require("../models/GameStateModel");
const { ReviewModel } = require("../models/ReviewModel");
const { UserModel } = require("../models/UserModel");
const {
  normalizeLimit,
  normalizePage,
  paginate,
  sanitizeUser,
} = require("../utils/helpers");

const gameController = {
  async getCatalog(req, res) {
    return res.json({ games: await GameModel.getAll() });
  },

  async saveState(req, res) {
    const { gameId, board, timeLeft, currentTurn, metadata } = req.body || {};

    if (!gameId) {
      return res.status(400).json({ message: "gameId is required" });
    }

    if (!(await GameModel.getById(gameId))) {
      return res.status(404).json({ message: "Game not found" });
    }

    const state = await GameStateModel.saveState(req.user.id, gameId, {
      board,
      timeLeft: Number(timeLeft || 0),
      currentTurn: currentTurn || "player",
      metadata: metadata || {},
    });

    return res.json({ message: "State saved", state });
  },

  async loadState(req, res) {
    const gameId = Number(req.params.gameId);
    const state = await GameStateModel.loadState(req.user.id, gameId);

    if (!state) {
      return res.status(404).json({ message: "No saved state found" });
    }

    return res.json({ state });
  },

  async getReviews(req, res) {
    const gameId = Number(req.params.gameId);
    const page = normalizePage(req.query.page, 1);
    const limit = normalizeLimit(req.query.limit, 10, 50);
    const reviews = await Promise.all((await ReviewModel.getGameReviews(gameId)).map(async (review) => ({
      ...review,
      user: sanitizeUser(await UserModel.findById(review.userId)),
    })));
    const payload = paginate(reviews, page, limit);

    return res.json({
      reviews: payload.items,
      pagination: payload.pagination,
    });
  },
};

module.exports = { gameController };
