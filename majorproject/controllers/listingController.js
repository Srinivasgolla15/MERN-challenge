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
  let url = req.file.path;
  let filename = req.file.filename;
  const listing = req.body.listing;
  listing.image = { url, filename };
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

  // Find the listing
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing Not Found");
    return res.redirect("/listings");
  }

  // Update text fields
  listing.title = req.body.listing.title;
  listing.description = req.body.listing.description;
  listing.price = req.body.listing.price;
  listing.country = req.body.listing.country;
  listing.location = req.body.listing.location;

  // Update image if new file uploaded
  if (req.file) {
    // Delete old Cloudinary image if exists
    if (listing.image && listing.image.filename) {
      const cloudinary = require("cloudinary").v2;
      await cloudinary.uploader.destroy(listing.image.filename);
    }

    listing.image = {
      url: req.file.path,
      filename: req.file.filename
    };
  }

  await listing.save();

  req.flash("success", "Listing Updated");
  res.redirect(`/listings/${id}`);
};

 
// DELETE - Delete Listing
 
module.exports.deleteListing = async (req, res) => {
  const { id } = req.params;
   const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing Not Found");
    return res.redirect("/listings");
  }

  if (listing.image && listing.image.filename) {
    const cloudinary = require("cloudinary").v2;
    await cloudinary.uploader.destroy(listing.image.filename);
  }

  await Listing.findByIdAndDelete(id);

  req.flash("error", "Listing Deleted");
  res.redirect("/listings");
};