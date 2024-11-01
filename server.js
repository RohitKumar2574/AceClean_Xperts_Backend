const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/users");
const reviewRoutes = require("./routes/reviews");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/reviews", reviewRoutes);

// Routes
app.use("/api/auth", authRoutes);

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
