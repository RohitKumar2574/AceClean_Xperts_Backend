// routes/reviews.js
const express = require("express");
const Review = require("../models/Review");
const User = require("../models/User");

const router = express.Router();

// POST: Add a new review
router.post("/add", async (req, res) => {
  console.log("Inside review fetch", req.body);
  const { email, review, rating } = req.body;
  const existingUser = await User.findOne({ email });
  console.log("review ..", existingUser);
  const name = existingUser.name;
  try {
    const newReview = new Review({ name, email, review, rating });
    await newReview.save();
  console.log("review ..", newReview);

    res.status(201).json(newReview);
  } catch (error) {
    console.log("error adding review", error);

    res.status(400).json({ message: "Error adding review", error });
  }
});

// GET: Fetch all reviews
router.get("/", async (req, res) => {
  try {
    console.log("Inside review fetch");

    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews", error });
  }
});

module.exports = router;
