  const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    cleanerName: { type: String },
    date: { type: String, required: true },
    timeRange: { type: String, required: true },
    cleaningType: { type: String, required: true },
    packageName: { type: String, required: true },
    packageDetails: { type: String, required: true },
    packagePrice: { type: Number, required: true },
    hst: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["upcoming", "completed", "cancelled"],
      default: "upcoming",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", AppointmentSchema);
