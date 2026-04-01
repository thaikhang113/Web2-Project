const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname, "../../.env"), quiet: true });

const env = {
  port: Number(process.env.PORT || 3000),
  jwtSecret: process.env.JWT_SECRET || "board-game-secret",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:5173",
  appUrl: process.env.APP_URL || "http://localhost:5173",
  apiKey: process.env.API_KEY || "",
  dbMode: process.env.DB_MODE || "file",
  dbSsl: String(process.env.DB_SSL || "false").toLowerCase() === "true",
  databaseUrl: process.env.DATABASE_URL || "",
  supabaseUrl: process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || "",
  supabaseAnonKey:
    process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || "",
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
  docsUsername: process.env.DOCS_USERNAME || "admin",
  docsPassword: process.env.DOCS_PASSWORD || process.env.API_KEY || "changeme",
  httpsPfxPath: process.env.HTTPS_PFX_PATH || "",
  httpsPfxPassphrase: process.env.HTTPS_PFX_PASSPHRASE || "",
  dataFilePath:
    process.env.DATA_FILE_PATH ||
    path.resolve(__dirname, "../data/db.json"),
};

module.exports = { env };
