const { Listing } = require("../models/listing");
const ExpressError = require("../utils/ExpressError");
const { listingSchema } = require("../schema");

module.exports.listingValidator =(req, res, next) => {
  const { error } = listingSchema.validate(req.body);

  if (error) {
    const errMsg = error.details.map(el => el.message).join(",");
    throw new ExpressError(400, errMsg);
  }

  next();
};
// INDEX - Show All Listings
 
module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/listings.ejs", { allListings });
};

 
// NEW - Render Form
 
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new");
};

 
// CREATE - Add Listing
 
module.exports.createListing = async (req, res) => {
  const listing = req.body.listing;

  listing.owner = req.user._id;

  await Listing.create(listing);

  req.flash("success", "New Listing Created");
  res.redirect("/listings");
};

 
// SHOW - Show One Listing
 
module.exports.showListing = async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: { path: "author" },
    })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing Not Found");
    return res.redirect("/listings");
  }

  res.render("listings/show.ejs", { listing });
};

 
// EDIT - Render Edit Form
 
module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing Not Found");
    return res.redirect("/listings");
  }

  res.render("listings/edit.ejs", { listing });
};

 
// UPDATE - Update Listing
 
module.exports.updateListing = async (req, res) => {
  const { id } = req.params;

  if (!req.body.listing) {
    throw new ExpressError(400, "Send Valid Data");
  }

  await Listing.findByIdAndUpdate(id, req.body.listing);

  req.flash("success", "Listing Updated");
  res.redirect(`/listings/${id}`);
};

 
// DELETE - Delete Listing
 
module.exports.deleteListing = async (req, res) => {
  const { id } = req.params;

  await Listing.findByIdAndDelete(id);

  req.flash("error", "Listing Deleted");
  res.redirect("/listings");
};