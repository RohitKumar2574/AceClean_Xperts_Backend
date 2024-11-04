const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const reviewRoutes = require("./routes/reviews");
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const createAdminAccount = require("./scripts/admin");

require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Create admin account
createAdminAccount();

// Routes
app.use("/reviews", reviewRoutes);
app.use("/register", registerRoute);
app.use("/auth", loginRoute);

// MongoDB Configuration
const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

mongoose
  .connect(
    "mongodb+srv://rktoor2574:rohit2574@cluster0.db9gs0u.mongodb.net/",
    {}
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));
