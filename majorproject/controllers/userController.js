const User = require("../models/user");
const ExpressError = require("../utils/ExpressError");

// RENDER SIGNUP FORM
module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup");
};

// SIGNUP LOGIC
module.exports.signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email });
    const registeredUser = await User.register(user, password);

    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to WayPoint");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

// RENDER LOGIN FORM
module.exports.renderLoginForm = (req, res) => {
  res.render("users/login");
};

// LOGIN LOGIC
module.exports.login = async (req, res) => {
  req.flash("success", "Welcome Back!");
  res.redirect(res.locals.redirectTo || "/listings");
};

// LOGOUT LOGIC
module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash("success", "Logged you out!");
    res.redirect("/listings");
  });
};