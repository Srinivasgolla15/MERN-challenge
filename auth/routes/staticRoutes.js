const express = require('express');
const router = express.Router();
const {checkAuth} = require("../middlewares/auth")

router.get("/signup",(req,res)=>{
    return res.render("signup");
});

router.get("/login",(req,res)=>{
    return res.render("login");
});

router.get('/', checkAuth, (req, res) => {
    res.render('home', { user: req.user });
});




module.exports = router;

// const express = require('express');
// const router = express.Router();
// const checkAuth = require("../middlewares/auth");

// router.get("/signup", (req, res) => {
//     if (req.user) return res.redirect('/');
//     res.render("signup");
// });

// router.get("/login", (req, res) => {
//     if (req.user) return res.redirect('/');
//     res.render("login");
// });

// router.get('/', checkAuth, (req, res) => {
//     res.render('home', { user: req.user });
// });

// module.exports = router;
