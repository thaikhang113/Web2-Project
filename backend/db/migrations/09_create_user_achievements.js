exports.up = async function up(knex) {
  await knex.schema.createTable("user_achievements", (table) => {
    table.increments("id").primary();
    table.integer("user_id").notNullable().references("id").inTable("users").onDelete("CASCADE");
    table.integer("achievement_id").notNullable().references("id").inTable("achievements").onDelete("CASCADE");
    table.timestamp("earned_at", { useTz: true }).notNullable().defaultTo(knex.fn.now());
    table.unique(["user_id", "achievement_id"]);
  });

  await knex.schema.raw("create index user_achievements_user_id_idx on user_achievements (user_id)");
  await knex.schema.raw(
    "create index user_achievements_achievement_id_idx on user_achievements (achievement_id)",
  );
};

exports.down = async function down(knex) {
  await knex.schema.dropTableIfExists("user_achievements");
};
