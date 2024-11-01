// routes/reviews.js
const express = require("express");
const Review = require("../models/Review");

const router = express.Router();

// POST: Add a new review
router.post("/add", async (req, res) => {
  const { name, email, review, rating } = req.body;

  try {
    const newReview = new Review({ name, email, review, rating });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ message: "Error adding review", error });
  }
});

// GET: Fetch all reviews
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews", error });
  }
});

module.exports = router;
