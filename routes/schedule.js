const express = require("express");
const router = express.Router();
const AppointmentController = require("../controllers/appoinment.controller");
const validateAppointment = require("../middlewares/appointmentMiddleware");

router.post("/", validateAppointment, AppointmentController.bookAppointment);
router.get("/", AppointmentController.getAppointments);
router.get("/status-graph", AppointmentController.getGraphData);
router.get("/daily-sales", AppointmentController.getDailySalesData);

module.exports = router;
