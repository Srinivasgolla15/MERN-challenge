const express = require("express");
const router = express.Router({ mergeParams: true });

const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middlewares/auth");
const userController = require("../controllers/userController");

// SIGNUP ROUTES
router.get("/signup", userController.renderSignupForm);
router.post("/signup", wrapAsync(userController.signup));

// LOGIN ROUTES
router.get("/login", userController.renderLoginForm);
router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  wrapAsync(userController.login)
);

// LOGOUT ROUTE
router.get("/logout", userController.logout);

module.exports = router;