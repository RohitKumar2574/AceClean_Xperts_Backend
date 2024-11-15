// controllers/user.js
const userService = require("../services/user");

async function getUsers(req, res) {
  try {
    // Call the getUsers function from the userService
    const users = await userService.getUsers();
    res.json(users); // Respond with the users
  } catch (error) {
    // Handle errors and send error response
    res.status(500).json({ message: error.message });
  }
}

module.exports = { getUsers };
