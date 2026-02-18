const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const { Listing } = require("./models/listing");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync");
const ExpressError = require("./utils/ExpressError");
const {listingSchema,reviewSchema} = require("./schema");
const Review = require("./models/reviews");
const flash = require("connect-flash");
const session = require("express-session");
const listingRoute = require("./routes/listings");



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

app.use("/listings",listingRoute);


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
//index route
//reviews
app.post("/listings/:id/reviews",validateReviews,wrapAsync(async(req,res)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);

    listing.reviews.push(newReview._id);

    await newReview.save();
    await listing.save();
    req.flash("success", "Review added successfully!");
    
    res.redirect(`/listings/${listing._id}`);
}));

app.delete("/listings/:id/reviews/:reviewid",wrapAsync(async(req,res)=>{
    let {id,reviewid} = req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewid}})
    await Review.findByIdAndDelete(reviewid);
    req.flash("error", "Review deleted successfully!");
    res.redirect(`/listings/${id}`)

}))


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