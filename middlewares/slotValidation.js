const { body, param, query, validationResult } = require("express-validator");

exports.validateSlot = [
  body("packageId").isMongoId().withMessage("Invalid packageId format"),
  body("packageName").notEmpty().withMessage("packageName is required"),
  body("date").isISO8601().withMessage("Invalid date format"),
  body("slots").isArray({ min: 1 }).withMessage("slots must be a non-empty array"),
  body("slots.*.startTime").notEmpty().withMessage("startTime is required for each slot"),
  body("slots.*.endTime").notEmpty().withMessage("endTime is required for each slot"),
  body("slots.*.status")
    .optional()
    .isIn(["available", "booked", "unavailable"])
    .withMessage("Invalid status value"),
  body("slots.*.bookedBy")
    .optional()
    .isMongoId()
    .withMessage("Invalid bookedBy format"),
];

exports.validateSlotId = [
  param("id").isMongoId().withMessage("Invalid slot ID format"),
];

exports.validateDate = [
    query("date").isISO8601().withMessage("Invalid date format (expected ISO 8601 format)")
  ];

exports.validationHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
