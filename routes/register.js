const express = require("express");
const registerController = require("../controllers/register");

const router = express.Router();

// POST: Create a new user
router.post("/", registerController.createUser);

module.exports = router;
