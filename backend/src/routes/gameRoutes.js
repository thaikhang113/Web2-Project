const express = require("express");

const { gameController } = require("../controllers/gameController");
const { reviewController } = require("../controllers/reviewController");

const router = express.Router();

router.get("/catalog", gameController.getCatalog);
router.post("/save", gameController.saveState);
router.get("/load/:gameId", gameController.loadState);
router.get("/:gameId/reviews", gameController.getReviews);
router.post("/:gameId/reviews", reviewController.postReview);

module.exports = { gameRoutes: router };
