const express = require('express');
const router =  express.Router();
const { restrictToLoggedinUserOnly } = require('../middlewares/auth');


router.get("/signup",(req,res)=>{
    return res.render("signup.ejs");
});

router.get("/login",(req,res)=>{
    return res.render("login.ejs");
});

router.get("/", restrictToLoggedinUserOnly, (req,res)=>{
    return res.render("home.ejs");
});

module.exports = router;