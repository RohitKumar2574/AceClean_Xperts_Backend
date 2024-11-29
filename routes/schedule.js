const express = require("express");
const router = express.Router();
const AppointmentController = require("../controllers/appoinment.controller");
const validateAppointment = require("../middlewares/appointmentMiddleware");

router.post("/", validateAppointment, AppointmentController.bookAppointment);
router.get("/", AppointmentController.getAppointments);
module.exports = router;
