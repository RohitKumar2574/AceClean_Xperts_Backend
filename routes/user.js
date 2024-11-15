// routes/user.js
const express = require("express");
const cors = require("cors");
const userController = require("../controllers/user");
const authMiddleware = require("../utils/authMiddleware");

const router = express.Router();

// Enable CORS
router.use(cors());

// Define route to fetch all users
router.get("/users", authMiddleware.authenticateToken, userController.getUsers);

module.exports = router;
