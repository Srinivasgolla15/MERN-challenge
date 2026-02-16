const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const { Listing } = require("./models/listing");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync");
const ExpressError = require("./utils/ExpressError");
const {ListingSchema} = require("./schema");
const Review = require("./models/reviews");
const flash = require("connect-flash");
const session = require("express-session");



const app = express();

//DB COnnection
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/WanderLust')
    console.log(" connected to db")
}
main().catch(err => console.log(err));

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(session({
    secret: "mysupersecret",
    resave: false,
    saveUninitialized: true
}));
 

//views engine
app.engine("ejs", ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, "public")));
app.use(flash());
//flash
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

//routes
app.get("/", (req, res) => {
    res.send("welcome")
})

const validateListing = (req,res,next) =>{
    let {error} = ListingSchema.validate(req.body);
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
//index route
app.get("/listings", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/listings.ejs", { allListings });
}));
//new listing
app.get("/listings/new", (req, res) => {
    res.render("listings/new")
})
//post create route
app.post("/listings",validateListing,
    wrapAsync(async (req, res) => {
        
        let listing = req.body.listing;
        await Listing.create(listing);
        res.redirect("/listings");


    })
);
//show Route
app.get("/listings/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
    res.render("listings/show.ejs", { listing })
}));

//edit route
app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing })
}));
app.put("/listings/:id",validateListing, wrapAsync(async (req, res) => {
    if (!req.body.listing){
            throw new ExpressError(400,"Send Valid data or listing")
        }
    let listing = req.body.listing;
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, listing);
    res.redirect(`/listings/${id}`);
}));
app.delete("/listings/:id",wrapAsync( async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings")
}));

//reviews
app.post("/listings/:id/reviews",async(req,res)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);

    listing.reviews.push(newReview._id);

    await newReview.save();
    await listing.save();
    req.flash("success", "Review added successfully!");
    
    res.redirect(`/listings/${listing._id}`);
})


app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});


app.use((err, req, res, next) => {
    let {statusCode = 500,message= "something went wrong"} = err;
    res.status(statusCode).render( "error.ejs",{message});
})





//server
app.listen(3000, () => {
    console.log("server is running at port 3000");
})