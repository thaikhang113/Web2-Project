exports.seed = async function seed(knex) {
  await knex("game_states").insert([
    {
      id: 1,
      user_id: 2,
      game_id: 1,
      board: JSON.stringify([]),
      time_left: 135,
      current_turn: "player",
      metadata: JSON.stringify({ selectedIndex: 17, score: 20, status: "Tran dang do." }),
      saved_at: "2026-03-30T09:00:00Z",
    },
    {
      id: 2,
      user_id: 5,
      game_id: 4,
      board: JSON.stringify([]),
      time_left: 48,
      current_turn: "running",
      metadata: JSON.stringify({ score: 80, status: "Dang chay..." }),
      saved_at: "2026-03-30T09:10:00Z",
    },
  ]);

  await knex.raw(
    "select setval(pg_get_serial_sequence('game_states', 'id'), (select coalesce(max(id), 1) from game_states), true)",
  );
};
