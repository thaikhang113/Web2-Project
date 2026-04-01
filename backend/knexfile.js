const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname, ".env"), quiet: true });

const ssl =
  String(process.env.DB_SSL || "false").toLowerCase() === "true"
    ? { rejectUnauthorized: false }
    : false;

module.exports = {
  development: {
    client: "pg",
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl,
    },
    migrations: {
      directory: path.resolve(__dirname, "db/migrations"),
    },
    seeds: {
      directory: path.resolve(__dirname, "db/seeds"),
    },
    pool: {
      min: 0,
      max: 10,
    },
  },
};
