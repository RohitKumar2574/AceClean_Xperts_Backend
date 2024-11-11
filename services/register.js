const User = require("../models/User");
const bcrypt = require("bcrypt");

async function createUser(userData) {
  const { name, email, username, password, role } = userData;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    username,
    password: hashedPassword,
    role: role || "customer",
  });

  const savedUser = await newUser.save();
  return savedUser;
}

module.exports = { createUser };
