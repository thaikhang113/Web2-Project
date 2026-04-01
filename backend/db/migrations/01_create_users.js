exports.up = async function up(knex) {
  await knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("username", 50).notNullable().unique();
    table.string("email", 120).notNullable().unique();
    table.string("password_hash", 255).notNullable();
    table.string("role", 20).notNullable().defaultTo("client");
    table.text("avatar");
    table.text("bio");
    table.timestamps(true, true);
  });
};

exports.down = async function down(knex) {
  await knex.schema.dropTableIfExists("users");
};
