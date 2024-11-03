const User = require("../models/User");
const bcrypt = require("bcrypt");

async function createUser(userData) {
  const { name, email, password, role } = userData;
  const hashedPassword = await bcrypt.hash(password, 10);
  const createdUser = new User({
    name,
    email,
    password: hashedPassword, // store hashed password in `password` field
    role: role || "customer", // default to "customer" if role is not provided
  });

  const savedUser = await createdUser.save();
  return savedUser;
}

module.exports = { createUser };
