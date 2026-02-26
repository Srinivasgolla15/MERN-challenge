const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync");
 
const listingController = require("../controllers/listingController");
const { isLoggedIn, isAuthor } = require("../middlewares/auth");
const validateListing = listingController.listingValidator;

 
// INDEX - Show all listings
router.get(
  "/",
  wrapAsync(listingController.index)
);


// NEW - Render new form
router.get(
  "/new",
  isLoggedIn,
  listingController.renderNewForm
);


// CREATE - Add new listing
router.post(
  "/",
  isLoggedIn,
  validateListing,
  wrapAsync(listingController.createListing)
);


// SHOW - Show single listing
router.get(
  "/:id",
  wrapAsync(listingController.showListing)
);


// EDIT - Render edit form
router.get(
  "/:id/edit",
  isLoggedIn,
  wrapAsync(listingController.renderEditForm)
);


// UPDATE - Update listing
router.put(
  "/:id",
  isLoggedIn,
  isAuthor,
  validateListing,
  wrapAsync(listingController.updateListing)
);


// DELETE - Delete listing
router.delete(
  "/:id",
  isLoggedIn,
  isAuthor,
  wrapAsync(listingController.deleteListing)
);


module.exports = router;