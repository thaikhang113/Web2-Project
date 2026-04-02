const express = require("express");

const {
  achievementController,
} = require("../controllers/achievementController");

const router = express.Router();

router.get("/", achievementController.getMyAchievements);

module.exports = { achievementRoutes: router };
