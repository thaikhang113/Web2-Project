const { db } = require("../config/db");
const { mapGame } = require("../utils/mappers");

const GameModel = {
  async getAll() {
    const rows = await db("games").select("*").orderBy("id", "asc");
    return rows.map(mapGame);
  },

  async getEnabled() {
    const rows = await db("games")
      .where({ is_enabled: true })
      .select("*")
      .orderBy("id", "asc");
    return rows.map(mapGame);
  },

  async getById(id) {
    const row = await db("games").where({ id: Number(id) }).first();
    return mapGame(row);
  },

  async update(id, changes) {
    const [row] = await db("games")
      .where({ id: Number(id) })
      .update(
        {
          board_size: changes.boardSize,
          is_enabled: changes.isEnabled,
          accent: changes.accent,
          description: changes.description,
          updated_at: db.fn.now(),
        },
        "*",
      );

    return mapGame(row);
  },
};

module.exports = { GameModel };
