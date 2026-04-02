const express = require("express");

const { adminController } = require("../controllers/adminController");

const router = express.Router();

router.get("/users", adminController.getUsers);
router.get("/stats", adminController.getStats);
router.get("/games", adminController.getGamesConfig);
router.put("/games/:gameId", adminController.updateGameConfig);

module.exports = { adminRoutes: router };
