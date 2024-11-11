const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true }, // Ensure `username` is required and unique
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "customer"], default: "customer" },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
