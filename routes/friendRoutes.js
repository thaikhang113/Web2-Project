const express = require("express");

const { friendController } = require("../controllers/friendController");

const router = express.Router();

router.get("/", friendController.getFriendsList);
router.post("/", friendController.handleFriendRequest);

module.exports = { friendRoutes: router };
