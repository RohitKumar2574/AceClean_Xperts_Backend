// routes/auth.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Register route
router.post("/register", async (req, res) => {
  const { email, username, password } = req.body;

  // Validate input (basic example)
  if (!email || !username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Create a new user
    const newUser = new User({ email, username, password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
