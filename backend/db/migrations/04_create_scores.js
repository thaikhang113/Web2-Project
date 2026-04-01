exports.up = async function up(knex) {
  await knex.schema.createTable("scores", (table) => {
    table.increments("id").primary();
    table.integer("user_id").notNullable().references("id").inTable("users").onDelete("CASCADE");
    table.integer("game_id").notNullable().references("id").inTable("games").onDelete("CASCADE");
    table.integer("score").notNullable();
    table.integer("duration").notNullable().defaultTo(0);
    table.timestamp("played_at", { useTz: true }).notNullable().defaultTo(knex.fn.now());
  });

  await knex.schema.raw("create index scores_user_id_idx on scores (user_id)");
  await knex.schema.raw("create index scores_game_id_idx on scores (game_id)");
  await knex.schema.raw(
    "create index scores_game_rank_idx on scores (game_id, score desc, duration asc, played_at desc)",
  );
};

exports.down = async function down(knex) {
  await knex.schema.dropTableIfExists("scores");
};
