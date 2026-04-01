const { env } = require("../config/env");

function requireApiKey(req, res, next) {
  if (!env.apiKey) {
    return next();
  }

  const apiKey = req.headers["x-api-key"];
  if (apiKey !== env.apiKey) {
    return res.status(401).json({ message: "Missing or invalid API key" });
  }

  return next();
}

module.exports = { requireApiKey };
