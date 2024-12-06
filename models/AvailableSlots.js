const mongoose = require('mongoose');

const AvailableSlotsSchema = new mongoose.Schema({
  packageId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Package" },
  packageName: { type: String, required: true },
  date: { type: Date, required: true },
  slots: [
    {
      startTime: { type: String, required: true },
      endTime: { type: String, required: true },
      status: { type: String, enum: ["available", "booked", "unavailable"], default: "available" },
      bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    }
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AvailableSlots', AvailableSlotsSchema);
