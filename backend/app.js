const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const { env } = require("./config/env");
const { requireApiKey } = require("./middlewares/apiKey");
const { authenticate } = require("./middlewares/authenticate");
const { docsAuth } = require("./middlewares/docsAuth");
const { requireAdmin } = require("./middlewares/requireAdmin");
const { achievementRoutes } = require("./routes/achievementRoutes");
const { adminRoutes } = require("./routes/adminRoutes");
const { authRoutes } = require("./routes/authRoutes");
const { friendRoutes } = require("./routes/friendRoutes");
const { gameRoutes } = require("./routes/gameRoutes");
const { messageRoutes } = require("./routes/messageRoutes");
const { rankingRoutes } = require("./routes/rankingRoutes");
const { scoreRoutes } = require("./routes/scoreRoutes");
const { userRoutes } = require("./routes/userRoutes");

const app = express();
const swaggerDocument = YAML.load(require("path").resolve(__dirname, "./docs/swagger.yaml"));

app.use(
  cors({
    origin: env.corsOrigin,
    credentials: true,
  }),
);
app.use(morgan("dev"));
app.use(express.json({ limit: "2mb" }));

app.use(
  "/api-docs",
  docsAuth,
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    customSiteTitle: "Board Game Hub API Docs",
  }),
);

app.use("/api", requireApiKey);

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    mode: "database",
    requestedDbMode: env.dbMode,
    port: env.port,
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", authenticate, userRoutes);
app.use("/api/friends", authenticate, friendRoutes);
app.use("/api/messages", authenticate, messageRoutes);
app.use("/api/games", authenticate, gameRoutes);
app.use("/api/scores", authenticate, scoreRoutes);
app.use("/api/rankings", authenticate, rankingRoutes);
app.use("/api/achievements", authenticate, achievementRoutes);
app.use("/api/admin", authenticate, requireAdmin, adminRoutes);

app.use((error, req, res, next) => {
  console.error(error);
  if (error.status || error.statusCode) {
    return res.status(error.status || error.statusCode).json({
      message: error.expose ? error.message : "Request error",
    });
  }

  return res.status(500).json({ message: "Internal server error" });
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

module.exports = app;
