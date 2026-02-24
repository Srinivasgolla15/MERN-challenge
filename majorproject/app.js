const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError"); 
const flash = require("connect-flash");
const session = require("express-session");
const listingRoute = require("./routes/listings");
const reviewsRoute =require("./routes/reviews");
const userRoute = require("./routes/user");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");



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
    saveUninitialized: true,
    cookie:{
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));

//before using passport we need to initialize it and also use session
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); 

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
app.use("/listings/:id/reviews",reviewsRoute);
app.use("/",userRoute);

 


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