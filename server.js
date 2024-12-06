const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const reviewRoutes = require("./routes/reviews");
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const createAdminAccount = require("./scripts/admin");
const userRoute = require("./routes/user");
const scheduleRoute = require("./routes/schedule");
const cleaningPackageRoutes = require("./routes/cleaningPackages.routes");
const errorHandler = require("./middlewares/errorHandlerMiddleware");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use("/reviews", reviewRoutes);
app.use("/register", registerRoute);
app.use("/auth", loginRoute);
app.use("/api/users", userRoute);
app.use("/api/appointments", scheduleRoute);
app.use("/api/packages", cleaningPackageRoutes); // Added packages route

// MongoDB Configuration
const mongoURI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5001;

// Connect to MongoDB
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true, // Added to ensure compatibility with newer MongoDB versions
  })
  .then(() => {
    console.log("MongoDB connected");
    createAdminAccount(); // Create admin account if needed
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Error Handler Middleware
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
