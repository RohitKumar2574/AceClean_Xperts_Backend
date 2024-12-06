const express = require("express");
const router = express.Router();
const {
  getAllPackages,
  createPackage,
  updatePackage,
  deletePackage,
  getAllPackageByType
} = require("../controllers/cleaningPackage.controller");

// Routes for cleaning packages
router.get("/", getAllPackageByType);
router.get("/", getAllPackages); // Fetch all packages
router.post("/", createPackage); // Create a new package
router.put("/:id", updatePackage); // Update a package by ID
router.delete("/:id", deletePackage); // Delete a package by ID

module.exports = router;
