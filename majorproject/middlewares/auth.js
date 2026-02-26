const Listing = require("../models/listing");
const Review = require("../models/reviews");

module.exports.isLoggedIn = (req,res,next) =>{
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash("error", "You must be logged in first");
        return res.redirect("/login");
    }
    next();
}


module.exports.saveRedirectUrl = (req,res,next) =>{
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
};

module.exports.isAuthor= async (req,res,next) =>{
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing.owner.equals(req.user._id)){
        req.flash("error","You don't have permission to edit this listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.isReviewAuthor= async (req,res,next) =>{
    let {  id,reviewid } = req.params;
    const review = await Review.findById(reviewid);
    if (!review.author.equals(req.user._id)){
        req.flash("error","You don't have permission to delete this review");
        return res.redirect(`/listings/${id}`);
    }
    next();
}