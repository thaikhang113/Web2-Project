const jwt = require("jsonwebtoken");

const { env } = require("../config/env");
const { UserModel } = require("../models/UserModel");

async function authenticate(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const [, token] = authHeader.split(" ");

  if (!token) {
    return res.status(401).json({ message: "Missing bearer token" });
  }

  try {
    const payload = jwt.verify(token, env.jwtSecret);
    const user = await UserModel.findById(payload.id);

    if (!user) {
      return res.status(401).json({ message: "Invalid token user" });
    }

    req.user = { id: user.id, role: user.role };
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

module.exports = { authenticate };
