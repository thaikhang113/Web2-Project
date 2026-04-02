const { db } = require("../config/db");
const { mapGameState } = require("../utils/mappers");

const GameStateModel = {
  async saveState(userId, gameId, payload) {
    const [row] = await db("game_states")
      .insert({
        user_id: Number(userId),
        game_id: Number(gameId),
        board: JSON.stringify(payload.board || []),
        time_left: Number(payload.timeLeft || 0),
        current_turn: payload.currentTurn || "player",
        metadata: JSON.stringify(payload.metadata || {}),
        saved_at: db.fn.now(),
      })
      .onConflict(["user_id", "game_id"])
      .merge({
        board: JSON.stringify(payload.board || []),
        time_left: Number(payload.timeLeft || 0),
        current_turn: payload.currentTurn || "player",
        metadata: JSON.stringify(payload.metadata || {}),
        saved_at: db.fn.now(),
      })
      .returning("*");

    return mapGameState(row);
  },

  async loadState(userId, gameId) {
    const row = await db("game_states")
      .where({ user_id: Number(userId), game_id: Number(gameId) })
      .first();
    return mapGameState(row);
  },
};

module.exports = { GameStateModel };
