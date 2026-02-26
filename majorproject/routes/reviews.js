const express = require("express");
const router=express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const {listingSchema,reviewSchema} = require("../schema");
const ExpressError = require("../utils/ExpressError");
const  Review  = require("../models/reviews");
const { Listing } = require("../models/listing");
const{isLoggedIn,isReviewAuthor} = require("../middlewares/auth");

const validateReviews = (req,res,next) =>{
    let {error} = reviewSchema.validate(req.body);
        // if (!req.body.listing){
        //     throw new ExpressError(400,"Send Valid data or listing")
        // }
        if (error){
            let errMsg = error.details.map((el)=> el.message).join(",");
            throw new ExpressError(400,errMsg);
        }else{
            next();
        }
}

router.post("/",isLoggedIn,validateReviews,wrapAsync(async(req,res)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;

    listing.reviews.push(newReview._id);

    await newReview.save();
    await listing.save();
    req.flash("success", "Review added successfully!");
    
    res.redirect(`/listings/${listing._id}`);
}));

router.delete("/:reviewid",isLoggedIn,isReviewAuthor,wrapAsync(async(req,res)=>{
    let {id,reviewid} = req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewid}})
    await Review.findByIdAndDelete(reviewid);
    req.flash("error", "Review deleted successfully!");
    res.redirect(`/listings/${id}`)

}))


module.exports = router;