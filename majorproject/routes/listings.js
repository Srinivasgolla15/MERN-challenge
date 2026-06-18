const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync");
const multer = require("multer");
const {storage} = require("../cloudConfig");
const upload = multer({ storage });

const listingController = require("../controllers/listingController");
const { isLoggedIn, isAuthor, isHost } = require("../middlewares/auth");
const validateListing = listingController.listingValidator;


// INDEX - Show all listings

router
    .route("/")
    .get(
         
        wrapAsync(listingController.index)
    )
    .post(
        upload.single("listing[image]"),
        isLoggedIn,
        isHost,
        validateListing,
        wrapAsync(listingController.createListing)
    );




// NEW - Render new form
router.get(
    "/new",
    isLoggedIn,
    isHost,
    listingController.renderNewForm
);





// SHOW - Show single listing
router.get(
    "/:id",
    wrapAsync(listingController.showListing)
);


// EDIT - Render edit form
router.get(
    "/:id/edit",
    isLoggedIn,
    wrapAsync(listingController.renderEditForm)
);


// UPDATE - Update listing
router.put(
    "/:id",
    
    isLoggedIn,
    isAuthor,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
);


// DELETE - Delete listing
router.delete(
    "/:id",
    isLoggedIn,
    isAuthor,
    wrapAsync(listingController.deleteListing)
);


module.exports = router;