const express = require("express");
const router = express.Router();

const {
  addReview,
  getReviews,
  getWebsiteReviews,
  changeReviewStatus,
  removeReview,
} = require("../controllers/review.controller");

router.post("/", addReview);

router.get("/", getReviews);

router.get("/website", getWebsiteReviews);

router.put("/:id", changeReviewStatus);

router.delete("/:id", removeReview);

module.exports = router;