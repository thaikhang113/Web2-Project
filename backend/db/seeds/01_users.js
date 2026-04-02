const bcrypt = require("bcryptjs");

exports.seed = async function seed(knex) {
  await knex("user_achievements").del();
  await knex("reviews").del();
  await knex("messages").del();
  await knex("friendships").del();
  await knex("scores").del();
  await knex("game_states").del();
  await knex("achievements").del();
  await knex("games").del();
  await knex("users").del();

  const passwordHash = bcrypt.hashSync("password123", 10);

  await knex("users").insert([
    {
      id: 1,
      username: "admin",
      email: "admin@boardgame.dev",
      password_hash: passwordHash,
      role: "admin",
      avatar: "https://api.dicebear.com/9.x/shapes/svg?seed=Admin",
      bio: "Quan tri vien he thong.",
    },
    {
      id: 2,
      username: "lanpham",
      email: "lan@example.com",
      password_hash: passwordHash,
      role: "client",
      avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Lan",
      bio: "Yeu thich memory va game tri tue.",
    },
    {
      id: 3,
      username: "quangnguyen",
      email: "quang@example.com",
      password_hash: passwordHash,
      role: "client",
      avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Quang",
      bio: "Cao thu caro he vui ve.",
    },
    {
      id: 4,
      username: "thao",
      email: "thao@example.com",
      password_hash: passwordHash,
      role: "client",
      avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Thao",
      bio: "Me match-3 va bang ve pixel.",
    },
    {
      id: 5,
      username: "minh",
      email: "minh@example.com",
      password_hash: passwordHash,
      role: "client",
      avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Minh",
      bio: "Snake, rank va chat dem khuya.",
    },
    {
      id: 6,
      username: "trang",
      email: "trang@example.com",
      password_hash: passwordHash,
      role: "client",
      avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Trang",
      bio: "Tic-tac-toe la chan ai.",
    },
  ]);

  await knex.raw(
    "select setval(pg_get_serial_sequence('users', 'id'), (select coalesce(max(id), 1) from users), true)",
  );
};
