exports.up = async function up(knex) {
  await knex.schema.createTable("friendships", (table) => {
    table.increments("id").primary();
    table.integer("requester_id").notNullable().references("id").inTable("users").onDelete("CASCADE");
    table.integer("receiver_id").notNullable().references("id").inTable("users").onDelete("CASCADE");
    table.string("status", 20).notNullable().defaultTo("pending");
    table.timestamps(true, true);

    table.unique(["requester_id", "receiver_id"]);
    table.check("requester_id <> receiver_id");
  });

  await knex.schema.raw("create index friendships_requester_id_idx on friendships (requester_id)");
  await knex.schema.raw("create index friendships_receiver_id_idx on friendships (receiver_id)");
  await knex.schema.raw("create index friendships_status_idx on friendships (status)");
};

exports.down = async function down(knex) {
  await knex.schema.dropTableIfExists("friendships");
};
