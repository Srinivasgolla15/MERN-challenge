const express = require('express');
const router =  express.Router();


router.get("/signup",(req,res)=>{
    return res.render("signup.ejs");
});

router.get("/login",(req,res)=>{
    return res.render("login.ejs");
});

module.exports = router;