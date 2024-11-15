// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const reviewRoutes = require("./routes/reviews");
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const createAdminAccount = require("./scripts/admin");
const userRoute = require("./routes/user"); // Import userRoute

require("dotenv").config(); // Load environment variables from .env file

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use("/reviews", reviewRoutes);
app.use("/register", registerRoute);
app.use("/auth", loginRoute);
app.use("/api", userRoute); // Use the userRoute here

// MongoDB Configuration
const mongoURI = process.env.MONGODB_URI; // Get MongoDB URI from .env file
const PORT = process.env.PORT || 5001; // Use environment variable for the port, default to 5001

// MongoDB connection
mongoose
  .connect("mongodb+srv://rktoor2574:rohit2574@cluster0.db9gs0u.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");

    // Create admin account if it doesn't already exist
    createAdminAccount();
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
