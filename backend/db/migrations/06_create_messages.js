exports.up = async function up(knex) {
  await knex.schema.createTable("messages", (table) => {
    table.increments("id").primary();
    table.integer("sender_id").notNullable().references("id").inTable("users").onDelete("CASCADE");
    table.integer("receiver_id").notNullable().references("id").inTable("users").onDelete("CASCADE");
    table.text("content").notNullable();
    table.timestamp("created_at", { useTz: true }).notNullable().defaultTo(knex.fn.now());
  });

  await knex.schema.raw("create index messages_sender_id_idx on messages (sender_id)");
  await knex.schema.raw("create index messages_receiver_id_idx on messages (receiver_id)");
  await knex.schema.raw(
    "create index messages_conversation_idx on messages (sender_id, receiver_id, created_at desc)",
  );
};

exports.down = async function down(knex) {
  await knex.schema.dropTableIfExists("messages");
};
