const {Listing }= require("../models/listing");
const ExpressError = require("../utils/ExpressError");
const { listingSchema } = require("../schema");
const { geocodeAddress } = require("../utils/geoCode");

module.exports.listingValidator =(req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  console.log('Request body:', req.body);
  console.log('Validation error:', error);

  if (error) {
    const errMsg = error.details.map(el => el.message).join(",");
    console.log('Validation failed:', errMsg);
    req.flash("error", "Validation failed: " + errMsg);
    return res.redirect("/listings/new");
  }

  next();
};
// INDEX - Show All Listings
 
module.exports.index = async (req, res) => {
  try {
    const allListings = await Listing.find({});
    res.render("listings/listings.ejs", { allListings });
  } catch (error) {
    console.error('Error fetching listings:', error);
    req.flash("error", "Failed to fetch listings: " + error.message);
    res.redirect("/listings");
  }
};

 
// NEW - Render Form
 
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new");
};

 
// CREATE - Add Listing
 
module.exports.createListing = async (req, res) => {
    try {
        const listingData = req.body.listing;

        // Image
        listingData.image = {
            url: req.file.path,
            filename: req.file.filename
        };

        listingData.owner = req.user._id;

        let geometry;

        // If lat/lng from map
        if (listingData.latitude && listingData.longitude) {
            geometry = {
                type: "Point",
                coordinates: [
                    parseFloat(listingData.longitude),
                    parseFloat(listingData.latitude)
                ]
            };
        } else {
            // fallback to geocode
            const address = `${listingData.location}, ${listingData.country}`;
            const coords = await geocodeAddress(address);

            if (!coords) {
                req.flash("error", "Unable to determine location.");
                return res.redirect("/listings/new");
            }

            geometry = {
                type: "Point",
                coordinates: [coords.lng, coords.lat]
            };
        }

        listingData.geometry = geometry;

        delete listingData.latitude;
        delete listingData.longitude;

        await Listing.create(listingData);

        req.flash("success", "Listing Created");
        res.redirect("/listings");

    } catch (err) {
        console.error(err);
        req.flash("error", "Failed to create listing");
        res.redirect("/listings/new");
    }
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
  listing.image.url = listing.image.url.replace("/upload", "/upload/w_300");
  res.render("listings/edit.ejs", { listing });
};

 
// UPDATE - Update Listing
 
module.exports.updateListing = async (req, res) => {
  const { id } = req.params;

  if (!req.body.listing) {
    throw new ExpressError(400, "Send Valid Data");
  }

  // Find the listing
  const listing = await Listing.findByIdAndUpdate(id, req.body.listing);
  if (!listing) {
    req.flash("error", "Listing Not Found");
    return res.redirect("/listings");
  }

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
    await listing.save();
  }

  

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