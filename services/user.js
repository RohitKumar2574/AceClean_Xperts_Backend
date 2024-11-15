// services/user.js
const User = require("../models/User");

// Fetch all users from the database
async function getUsers() {
  try {
    const users = await User.find(); // Returns all users
    return users;
  } catch (error) {
    throw new Error("Error fetching users: " + error.message);
  }
}

// Export the function so it can be used in controllers
module.exports = {
  getUsers,
};
