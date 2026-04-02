exports.seed = async function seed(knex) {
  await knex("reviews").insert([
    { id: 1, user_id: 2, game_id: 1, rating: 5, comment: "Caro rat cuon va de thao tac.", created_at: "2026-03-26T09:00:00Z", updated_at: "2026-03-26T09:00:00Z" },
    { id: 2, user_id: 3, game_id: 3, rating: 4, comment: "Nhanh, gon va hop voi dua nho.", created_at: "2026-03-27T09:00:00Z", updated_at: "2026-03-27T09:00:00Z" },
    { id: 3, user_id: 4, game_id: 5, rating: 5, comment: "Mau sac dep va combo da tay.", created_at: "2026-03-28T09:00:00Z", updated_at: "2026-03-28T09:00:00Z" },
    { id: 4, user_id: 5, game_id: 4, rating: 4, comment: "Snake kha muot va vui.", created_at: "2026-03-29T09:00:00Z", updated_at: "2026-03-29T09:00:00Z" },
  ]);

  await knex.raw(
    "select setval(pg_get_serial_sequence('reviews', 'id'), (select coalesce(max(id), 1) from reviews), true)",
  );
};
