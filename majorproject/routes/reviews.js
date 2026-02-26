const express = require("express");
const router = express.Router({ mergeParams: true });

const wrapAsync = require("../utils/wrapAsync");
const reviewController = require("../controllers/reviewController");
const { isLoggedIn, isReviewAuthor } = require("../middlewares/auth");

// Validation middleware
const validateReview = reviewController.reviewValidator;

// CREATE REVIEW
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview)
);

// DELETE REVIEW
router.delete(
  "/:reviewid",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.deleteReview)
);

module.exports = router;