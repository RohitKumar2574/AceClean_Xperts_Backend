const jwt = require("jsonwebtoken");
const { secretKey } = require("../configurations/jwtConfig");

function generateToken(user) {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role, // Ensure role is added to the payload
  };

  return jwt.sign(payload, secretKey, { expiresIn: "1h" }); // Token expires in 1 hour
}

module.exports = {
  generateToken,
};
