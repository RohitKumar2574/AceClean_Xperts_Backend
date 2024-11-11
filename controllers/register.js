const userService = require("../services/register");

async function createUser(req, res) {
  try {
    const { name, email, username, password, role } = req.body;

    // Validate fields to ensure required values are present
    if (!name || !email || !username || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Pass only validated data to the service layer
    const user = await userService.createUser({
      name,
      email,
      username,
      password,
      role,
    });

    res.status(201).json({ user: user, message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);

    // Check if the error is due to a duplicate key for email or username
    if (error.code === 11000) {
      if (error.keyPattern.email) {
        return res.status(400).json({
          error: "Email already exists. Please use a different email.",
        });
      }
      if (error.keyPattern.username) {
        return res.status(400).json({
          error: "Username already exists. Please choose a different username.",
        });
      }
    }

    res.status(500).json({ error: "Failed to create user" });
  }
}

module.exports = { createUser };
