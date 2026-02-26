const { Listing } = require("../models/listing");
const Review = require("../models/reviews");
const ExpressError = require("../utils/ExpressError");
const { reviewSchema } = require("../schema");

// Validation middleware
module.exports.reviewValidator = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const errMsg = error.details.map(el => el.message).join(",");
    throw new ExpressError(400, errMsg);
  }
  next();
};

// CREATE REVIEW
module.exports.createReview = async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }

  const newReview = new Review(req.body.review);
  newReview.author = req.user._id;

  listing.reviews.push(newReview._id);

  await newReview.save();
  await listing.save();

  req.flash("success", "Review added successfully!");
  res.redirect(`/listings/${id}`);
};

// DELETE REVIEW
module.exports.deleteReview = async (req, res) => {
  const { id, reviewid } = req.params;

  // Remove review from listing array
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewid } });

  // Delete review document
  await Review.findByIdAndDelete(reviewid);

  req.flash("error", "Review deleted successfully!");
  res.redirect(`/listings/${id}`);
};