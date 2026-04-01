exports.up = async function up(knex) {
  await knex.schema.createTable("reviews", (table) => {
    table.increments("id").primary();
    table.integer("user_id").notNullable().references("id").inTable("users").onDelete("CASCADE");
    table.integer("game_id").notNullable().references("id").inTable("games").onDelete("CASCADE");
    table.integer("rating").notNullable();
    table.text("comment");
    table.timestamps(true, true);
    table.unique(["user_id", "game_id"]);
  });

  await knex.schema.raw("create index reviews_user_id_idx on reviews (user_id)");
  await knex.schema.raw("create index reviews_game_id_idx on reviews (game_id)");
};

exports.down = async function down(knex) {
  await knex.schema.dropTableIfExists("reviews");
};
