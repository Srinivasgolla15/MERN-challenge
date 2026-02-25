const express = require("express");
const router=express.Router();
const wrapAsync = require("../utils/wrapAsync");
const {listingSchema,reviewSchema} = require("../schema");
const ExpressError = require("../utils/ExpressError");
const { Listing } = require("../models/listing");
const {isLoggedIn} = require("../middlewares/auth");


const validateListing = (req,res,next) =>{
    let {error} = listingSchema.validate(req.body);
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

router.get("/", wrapAsync(async (req, res) => {
    
    const allListings = await Listing.find({});
    res.render("listings/listings.ejs", { allListings });
}));
//new listing
router.get("/new",isLoggedIn, (req, res) => {
    res.render("listings/new")
})
//post create route
 router.post("/",isLoggedIn,validateListing,
    wrapAsync(async (req, res) => {
        
        let listing = req.body.listing;
        listing.owner = req.user._id;
        await Listing.create(listing);
        req.flash("success","New Listing Created");
        res.redirect("/listings");


    })
);
//show Route
 router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
    .populate("reviews")
    .populate("owner");
    if(!listing){
        req.flash("error","Listing Not Found");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing })
}));

//edit route
router.get("/:id/edit",isLoggedIn, wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing })
}));
router.put("/:id",isLoggedIn,validateListing, wrapAsync(async (req, res) => {
    if (!req.body.listing){
            throw new ExpressError(400,"Send Valid data or listing")
        }
    let listing = req.body.listing;
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, listing);
    res.redirect(`/listings/${id}`);
}));
router.delete("/:id",isLoggedIn,wrapAsync( async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("error","Listing Deleted");
    res.redirect("/listings")
}));




module.exports = router;