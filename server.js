const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const reviewRoutes = require("./routes/reviews");
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const createAdminAccount = require("./scripts/admin");
const userRoute = require("./routes/user");
const scheduleRoute = require("./routes/schedule"); // Import scheduleRoute

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
app.use("/api/appointments", scheduleRoute); // Correctly register the appointments route

// MongoDB Configuration
const mongoURI = process.env.MONGODB_URI || "your_default_mongo_uri";
const PORT = process.env.PORT || 5001;

mongoose
  .connect("mongodb+srv://rktoor2574:rohit2574@cluster0.db9gs0u.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    createAdminAccount();
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
