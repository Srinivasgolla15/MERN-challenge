const express = require("express");
const router = express.Router();
const userProfileController = require("../controllers/userProfileContoller");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isAuthor, isHost } = require("../middlewares/auth");

router
    .route("/settings")
    .get(
        isLoggedIn,
        userProfileController.renderSettings
    );


router
    .route("/my-listings")
    .get(
        isLoggedIn,
        isHost,
        wrapAsync(userProfileController.mylistings)
    );

router
    .route("/become-host")
    .post(
        isLoggedIn,
        wrapAsync(userProfileController.becomeHost)
    );

module.exports = router;