
const User = require('../models/user');
const {verifyToken} = require("../service/auth")

async function checkAuth(req, res, next) {
    const token = req.cookies.token;
     if(!token){
        return res.redirect("/login");
     }

     try{
        const decoded = verifyToken(token);
        const user = await User.findById(decoded.userId);
        if(!user){
            return res.redirect("/login");
        }
        req.user = user;
        next();
     }catch(err){
        console.log("err",err);
     }

    
    
}

module.exports = {checkAuth};
