const jwt = require("jsonwebtoken");
const JWT_SECRET = "supersecretkey";

function generateToken(user) {
    return jwt.sign({
        userId : user._id
    },JWT_SECRET,  
    );
    
}

function verifyToken(token ) {
     return jwt.verify(token,JWT_SECRET);
}



module.exports = {
    generateToken,verifyToken
};
