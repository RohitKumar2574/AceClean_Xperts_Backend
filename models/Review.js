const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const reviewSchema = new mongoose.Schema(
  {
    identity: { type: Number }, // Auto-incremented field
    name: { type: String, required: true },
    email: { type: String, required: true },
    review: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  { timestamps: true }
);

// Apply the auto-increment plugin to the schema
reviewSchema.plugin(AutoIncrement, { inc_field: "identity" });

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
