const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

router.post("/", async (req, res) => {
  const {
    customerNameForCleaning,
    preferredDate,
    preferredTimeRange,
    cleaningType,
    packageName,
    packageDetails,
    packagePrice,
    hst,
    totalPrice,
  } = req.body;

  try {
    const existingAppointment = await Appointment.findOne({
      date: preferredDate,
      timeRange: preferredTimeRange,
    });

    if (existingAppointment) {
      return res
        .status(400)
        .json({ message: "Appointment slot already taken." });
    }

    const newAppointment = new Appointment({
      customerName: customerNameForCleaning,
      date: preferredDate,
      timeRange: preferredTimeRange,
      cleaningType,
      packageName,
      packageDetails,
      packagePrice,
      hst,
      totalPrice,
    });

    const savedAppointment = await newAppointment.save();
    return res.status(201).json({
      message: "Appointment successfully booked!",
      appointment: savedAppointment,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to create appointment." });
  }
});

module.exports = router;
