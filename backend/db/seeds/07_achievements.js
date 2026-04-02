exports.seed = async function seed(knex) {
  await knex("achievements").insert([
    { id: 1, name: "Khoi dong", description: "Choi 1 van dau tien.", icon: "sparkles", condition_type: "games_played", condition_value: 1 },
    { id: 2, name: "Cao thu 100", description: "Dat tu 100 diem tro len.", icon: "trophy", condition_type: "score", condition_value: 100 },
    { id: 3, name: "Ban tot", description: "Co it nhat 2 ban be.", icon: "users", condition_type: "friends", condition_value: 2 },
  ]);

  await knex("user_achievements").insert([
    { id: 1, user_id: 2, achievement_id: 1, earned_at: "2026-03-20T09:10:00Z" },
    { id: 2, user_id: 2, achievement_id: 2, earned_at: "2026-03-21T09:10:00Z" },
    { id: 3, user_id: 2, achievement_id: 3, earned_at: "2026-03-22T09:10:00Z" },
    { id: 4, user_id: 3, achievement_id: 1, earned_at: "2026-03-20T10:10:00Z" },
  ]);

  await knex.raw(
    "select setval(pg_get_serial_sequence('achievements', 'id'), (select coalesce(max(id), 1) from achievements), true)",
  );
  await knex.raw(
    "select setval(pg_get_serial_sequence('user_achievements', 'id'), (select coalesce(max(id), 1) from user_achievements), true)",
  );
};
