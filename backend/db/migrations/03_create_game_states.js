exports.up = async function up(knex) {
  await knex.schema.createTable("game_states", (table) => {
    table.increments("id").primary();
    table.integer("user_id").notNullable().references("id").inTable("users").onDelete("CASCADE");
    table.integer("game_id").notNullable().references("id").inTable("games").onDelete("CASCADE");
    table.jsonb("board").notNullable().defaultTo("[]");
    table.integer("time_left").notNullable().defaultTo(0);
    table.string("current_turn", 40).notNullable().defaultTo("player");
    table.jsonb("metadata").notNullable().defaultTo("{}");
    table.timestamp("saved_at", { useTz: true }).notNullable().defaultTo(knex.fn.now());
    table.unique(["user_id", "game_id"]);
  });

  await knex.schema.raw("create index game_states_user_id_idx on game_states (user_id)");
  await knex.schema.raw("create index game_states_game_id_idx on game_states (game_id)");
};

exports.down = async function down(knex) {
  await knex.schema.dropTableIfExists("game_states");
};
