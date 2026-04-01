const express = require("express");

const { userController } = require("../controllers/userController");

const router = express.Router();

router.get("/profile", userController.getProfile);
router.put("/profile", userController.updateProfile);
router.get("/", userController.searchUsers);

module.exports = { userRoutes: router };
