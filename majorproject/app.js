// Load environment variables from .env file
// Only in development, not production
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");          // Web framework
const mongoose = require("mongoose");        // MongoDB ODM
const path = require("path");                // Node path utilities
const methodOverride = require("method-override"); // Enables PUT/DELETE from forms
const ejsMate = require("ejs-mate");         // EJS layouts support
const ExpressError = require("./utils/ExpressError");
const flash = require("connect-flash");      // Flash messages
const session = require("express-session");  // Session support

// Route files
const listingRoute = require("./routes/listings");
const reviewsRoute = require("./routes/reviews");
const userRoute = require("./routes/user");
const userProfileRoute = require("./routes/userProfile");

// Passport Authentication
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");

const app = express();


// ==================================================
// DATABASE CONNECTION
// ==================================================

async function main() {

    // Connect to local MongoDB server
    await mongoose.connect(
        "mongodb://127.0.0.1:27017/WanderLust"
    );

    console.log("Connected to DB");
}

main().catch(err => console.log(err));


// ==================================================
// GENERAL MIDDLEWARES
// ==================================================

// Parse form data
// req.body becomes available
app.use(express.urlencoded({ extended: true }));

// Allows forms to send PUT and DELETE
// Example:
// POST /listing/1?_method=DELETE
// becomes
// DELETE /listing/1
app.use(methodOverride("_method"));


// ==================================================
// SESSION CONFIGURATION
// ==================================================

app.use(
    session({

        // Secret used to sign session cookie
        secret: "mysupersecret",

        // Don't save session if unchanged
        resave: false,

        // Don't create empty sessions
        saveUninitialized: true,

        cookie: {

            // Prevent JS access to cookie
            httpOnly: true,

            // Expiration date
            expires:
                Date.now()
                + 1000 * 60 * 60 * 24 * 7,

            // 7 days
            maxAge:
                1000 * 60 * 60 * 24 * 7
        }
    })
);


// ==================================================
// PASSPORT AUTHENTICATION
// ==================================================

// Initialize Passport
app.use(passport.initialize());

// Enable login sessions
app.use(passport.session());


// Local username/password strategy
passport.use(
    new LocalStrategy(
        User.authenticate()
    )
);


// Store user id in session
passport.serializeUser(
    User.serializeUser()
);


// Read user id from session
// and recreate req.user
passport.deserializeUser(
    User.deserializeUser()
);


// ==================================================
// VIEW ENGINE
// ==================================================

// Layout support for EJS
app.engine("ejs", ejsMate);

// Template engine
app.set("view engine", "ejs");

// Views folder path
app.set(
    "views",
    path.join(__dirname, "views")
);


// ==================================================
// STATIC FILES
// ==================================================

// CSS, JS, Images
app.use(
    express.static(
        path.join(__dirname, "public")
    )
);


// ==================================================
// FLASH MESSAGES
// ==================================================

app.use(flash());


// ==================================================
// GLOBAL VARIABLES FOR ALL TEMPLATES
// ==================================================

app.use((req, res, next) => {

    // Success flash messages
    res.locals.success =
        req.flash("success");

    // Error flash messages
    res.locals.error =
        req.flash("error");

    // Logged in user
    res.locals.currentUser =
        req.user;

    res.locals.searchAction = "/listings";

    next();
});


// ==================================================
// ROUTES
// ==================================================

// Home route
app.get("/", (req, res) => {
    res.send("welcome");
});

// Listings routes
app.use("/listings", listingRoute);

// Reviews routes
app.use(
    "/listings/:id/reviews",
    reviewsRoute
);

// Authentication routes
app.use("/", userRoute);

// User profile routes
app.use("/", userProfileRoute);


// ==================================================
// 404 HANDLER
// ==================================================

app.use((req, res, next) => {

    next(
        new ExpressError(
            404,
            "Page Not Found"
        )
    );
});


// ==================================================
// GLOBAL ERROR HANDLER
// ==================================================

app.use((err, req, res, next) => {

    let {
        statusCode = 500,
        message = "something went wrong"
    } = err;

    res
        .status(statusCode)
        .render("error.ejs", { message });
});


// ==================================================
// START SERVER
// ==================================================

app.listen(3000, () => {

    console.log(
        "server is running at port 3000"
    );
});