const { body, validationResult } = require("express-validator");

const validateAppointment = [
  body("customerName")
    .trim()
    .notEmpty()
    .withMessage("Customer name is required."),
  body("date")
    .isDate({ format: "YYYY-MM-DD" })
    .withMessage("Date must be in the format YYYY-MM-DD."),
  body("timeRange")
    .matches(/^(\d{1,2}:\d{2}\s?[APap][Mm])\s?-\s?(\d{1,2}:\d{2}\s?[APap][Mm])$/)
    .withMessage("Time range must be in the format 'HH:MM AM - HH:MM PM'."),
  body("cleaningType")
    .trim()
    .notEmpty()
    .withMessage("Cleaning type is required."),
  body("packageName")
    .trim()
    .notEmpty()
    .withMessage("Package name is required."),
  body("packageDetails")
    .trim()
    .notEmpty()
    .withMessage("Package details are required."),
  body("packagePrice")
    .isFloat({ min: 0 })
    .withMessage("Package price must be a positive number."),
  body("hst")
    .isFloat({ min: 0 })
    .withMessage("HST must be a positive number."),
  body("totalPrice")
    .isFloat({ min: 0 })
    .withMessage("Total price must be a positive number."),
  body("status")
    .optional()
    .isIn(["upcoming", "completed", "cancelled"])
    .withMessage("Status must be 'upcoming', 'completed', or 'cancelled'."),
  body("userId")
    .notEmpty()
    .withMessage("User ID is required.")
    .isMongoId()
    .withMessage("User ID must be a valid MongoDB ObjectId."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateAppointment;
