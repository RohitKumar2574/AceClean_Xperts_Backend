const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    date: { type: String, required: true },
    timeRange: { type: String, required: true },
    cleaningType: { type: String, required: true },
    packageName: { type: String, required: true },
    packageDetails: { type: String, required: true },
    packagePrice: { type: Number, required: true },
    hst: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", AppointmentSchema);
