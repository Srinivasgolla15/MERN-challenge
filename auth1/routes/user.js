const express = require('express');
const { handleUserLogout , handleUserSignup,handleUserLogin } = require('../controllers/user');
const router = express.Router();

router.post("/signup", handleUserSignup);

router.post("/login", handleUserLogin);

router.post("/logout", handleUserLogout);

module.exports= router;