exports.seed = async function seed(knex) {
  await knex("friendships").insert([
    { id: 1, requester_id: 2, receiver_id: 3, status: "accepted", created_at: "2026-03-10T09:00:00Z", updated_at: "2026-03-10T09:00:00Z" },
    { id: 2, requester_id: 2, receiver_id: 4, status: "accepted", created_at: "2026-03-11T09:00:00Z", updated_at: "2026-03-11T09:00:00Z" },
    { id: 3, requester_id: 5, receiver_id: 2, status: "pending", created_at: "2026-03-29T09:00:00Z", updated_at: "2026-03-29T09:00:00Z" },
    { id: 4, requester_id: 3, receiver_id: 6, status: "accepted", created_at: "2026-03-15T09:00:00Z", updated_at: "2026-03-15T09:00:00Z" },
  ]);

  await knex.raw(
    "select setval(pg_get_serial_sequence('friendships', 'id'), (select coalesce(max(id), 1) from friendships), true)",
  );
};
