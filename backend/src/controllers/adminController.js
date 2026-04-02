const { GameModel } = require("../models/GameModel");
const { ReviewModel } = require("../models/ReviewModel");
const { ScoreModel } = require("../models/ScoreModel");
const { UserModel } = require("../models/UserModel");
const { sanitizeUser } = require("../utils/helpers");

const adminController = {
  async getUsers(req, res) {
    return res.json({ users: (await UserModel.listAll()).map(sanitizeUser) });
  },

  async getStats(req, res) {
    const users = await UserModel.listAll();
    const scores = await ScoreModel.getAll();
    const games = await GameModel.getAll();
    const reviewsByGame = await Promise.all(games.map((game) => ReviewModel.getGameReviews(game.id)));
    const reviews = reviewsByGame.flat();

    const scoreByGame = scores.reduce((acc, item) => {
      acc[item.gameId] = (acc[item.gameId] || 0) + 1;
      return acc;
    }, {});

    const mostPlayedGameId = Number(
      Object.entries(scoreByGame).sort((a, b) => b[1] - a[1])[0]?.[0] || 0,
    );
    const mostPlayedGame = await GameModel.getById(mostPlayedGameId);

    return res.json({
      totalAccounts: users.length,
      totalScores: scores.length,
      totalReviews: reviews.length,
      enabledGames: games.filter((game) => game.isEnabled).length,
      mostPlayedGame: mostPlayedGame
        ? { id: mostPlayedGame.id, name: mostPlayedGame.name }
        : null,
    });
  },

  async getGamesConfig(req, res) {
    return res.json({ games: await GameModel.getAll() });
  },

  async updateGameConfig(req, res) {
    const gameId = Number(req.params.gameId);
    const { boardSize, isEnabled, accent, description } = req.body || {};
    const game = await GameModel.getById(gameId);

    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    const updated = await GameModel.update(gameId, {
      boardSize: boardSize ?? game.boardSize,
      isEnabled: isEnabled ?? game.isEnabled,
      accent: accent || game.accent,
      description: description || game.description,
    });

    return res.json({ message: "Game updated", game: updated });
  },
};

module.exports = { adminController };
