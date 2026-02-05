const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET || "dev-secret-change-me";

function createTokenForUser(user) {
  const payload = { _id: user._id,fullName: user.fullName, email: user.email, profileImageURL: user.profilePic, role: user.role };
  const token = jwt.sign(payload, SECRET, { expiresIn: "7d" });
  return token;
}

function validateToken(token) {
  return jwt.verify(token, SECRET);
}

module.exports = { createTokenForUser, validateToken };
