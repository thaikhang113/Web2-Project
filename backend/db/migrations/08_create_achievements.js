exports.up = async function up(knex) {
  await knex.schema.createTable("achievements", (table) => {
    table.increments("id").primary();
    table.string("name", 120).notNullable().unique();
    table.text("description").notNullable();
    table.string("icon", 80);
    table.string("condition_type", 40).notNullable();
    table.integer("condition_value").notNullable();
    table.timestamp("created_at", { useTz: true }).notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = async function down(knex) {
  await knex.schema.dropTableIfExists("achievements");
};
