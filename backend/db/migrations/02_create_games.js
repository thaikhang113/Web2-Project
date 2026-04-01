exports.up = async function up(knex) {
  await knex.schema.createTable("games", (table) => {
    table.increments("id").primary();
    table.string("name", 80).notNullable();
    table.string("slug", 80).notNullable().unique();
    table.text("description").notNullable();
    table.integer("board_size").notNullable();
    table.boolean("is_enabled").notNullable().defaultTo(true);
    table.string("accent", 20);
    table.jsonb("config").notNullable().defaultTo("{}");
    table.timestamps(true, true);
  });
};

exports.down = async function down(knex) {
  await knex.schema.dropTableIfExists("games");
};
