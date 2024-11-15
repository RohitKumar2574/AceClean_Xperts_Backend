const express = require("express");
const bcrypt = require("bcrypt");
const jwtUtils = require("../utils/jwtUtils");
const User = require("../models/User");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Compare the hashed password
  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Generate JWT Token
  const token = jwtUtils.generateToken(user);

  return res.json({
    message: "Login successful",
    token: token,
  });
});

module.exports = router;
