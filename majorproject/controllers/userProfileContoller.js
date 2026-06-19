
const User = require("../models/user");
const {Listing} = require("../models/listing");
const listingController = require("./listingController");
const wrapAsync = require("../utils/wrapAsync.js");
const buildQuery = require("../utils/buildQuery");


// setting page render
module.exports.renderSettings = async (req, res) => {
    const user = await User.findById(req.user._id);
    const listings = await Listing.find({ owner: req.user._id });
    const listingCount = listings.length;
    res.render("userProfile/settings.ejs", { currentUser: user, listingCount });
};


// beccome host 
module.exports.becomeHost = async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user.role != "host") {
        user.role = "host";
        await user.save();
    }
    req.flash("success", "You are now a host!");
    res.redirect("/listings");
};

// my listings page render
module.exports.mylistings = async (req, res) => {

    let query = {owner:req.user._id};
    query = buildQuery(req.query, query);
    console.log("FINAL QUERY:", query);
     
    const allListings = await Listing.find(query);
     
     

    // Pass the listings to the template
    res.render("listings/listings.ejs", { allListings, searchAction: "/my-listings" });
};

 





