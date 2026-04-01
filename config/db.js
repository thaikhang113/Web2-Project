const knex = require("knex");

const { env } = require("./env");

const db = knex({
	client: "pg",
	connection: {
		connectionString: env.databaseUrl,
		ssl: env.dbSsl ? { rejectUnauthorized: false } : false,
	},
	pool: {
		min: 0,
		max: 10,
	},
});

async function checkDatabaseConnection() {
	await db.raw("select 1");
}

module.exports = {
	db,
	checkDatabaseConnection,
};
