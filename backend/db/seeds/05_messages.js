exports.seed = async function seed(knex) {
  await knex("messages").insert([
    { id: 1, sender_id: 2, receiver_id: 3, content: "Chieu nay vao rank caro nhe?", created_at: "2026-03-28T09:00:00Z" },
    { id: 2, sender_id: 3, receiver_id: 2, content: "Ok, minh dang luyen tiep.", created_at: "2026-03-28T09:05:00Z" },
    { id: 3, sender_id: 2, receiver_id: 4, content: "Memory nay de thuong phet.", created_at: "2026-03-29T14:00:00Z" },
    { id: 4, sender_id: 4, receiver_id: 2, content: "Toi dang san combo match-3 day.", created_at: "2026-03-29T14:02:00Z" },
    { id: 5, sender_id: 3, receiver_id: 6, content: "Tic tac toe rematch khong?", created_at: "2026-03-29T15:00:00Z" },
  ]);

  await knex.raw(
    "select setval(pg_get_serial_sequence('messages', 'id'), (select coalesce(max(id), 1) from messages), true)",
  );
};
