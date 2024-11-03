const userService = require("../services/register");

async function createUser(req, res) {
  try {
    const userData = req.body;
    console.log("User Data Received:", userData);

    const user = await userService.createUser(userData);

    res.status(201).json({ user: user, message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
}

module.exports = { createUser };
