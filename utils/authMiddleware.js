// utils/authMiddleware.js
const jwt = require("jsonwebtoken");
const { secretKey } = require("../configurations/jwtConfig");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized: Missing token!" });
  }

  const [bearer, token] = authHeader.split(" ");
  if (bearer !== "Bearer" || !token) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Invalid token format" });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Forbidden: Invalid or expired token!" });
    }
    req.user = user;
    next();
  });
}

module.exports = { authenticateToken };
