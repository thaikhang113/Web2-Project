exports.seed = async function seed(knex) {
  await knex("scores").insert([
    { id: 1, user_id: 2, game_id: 1, score: 120, duration: 210, played_at: "2026-03-20T09:00:00Z" },
    { id: 2, user_id: 3, game_id: 1, score: 150, duration: 180, played_at: "2026-03-22T09:00:00Z" },
    { id: 3, user_id: 4, game_id: 3, score: 45, duration: 70, played_at: "2026-03-23T09:00:00Z" },
    { id: 4, user_id: 2, game_id: 5, score: 320, duration: 240, played_at: "2026-03-24T09:00:00Z" },
    { id: 5, user_id: 5, game_id: 4, score: 210, duration: 140, played_at: "2026-03-25T09:00:00Z" },
    { id: 6, user_id: 6, game_id: 6, score: 88, duration: 120, played_at: "2026-03-26T09:00:00Z" },
    { id: 7, user_id: 3, game_id: 2, score: 94, duration: 110, played_at: "2026-03-26T10:00:00Z" },
    { id: 8, user_id: 4, game_id: 7, score: 65, duration: 95, played_at: "2026-03-27T10:00:00Z" },
  ]);

  await knex.raw(
    "select setval(pg_get_serial_sequence('scores', 'id'), (select coalesce(max(id), 1) from scores), true)",
  );
};
