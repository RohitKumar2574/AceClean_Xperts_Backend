const User = require("../models/User");
const bcrypt = require("bcrypt");

async function createAdminAccount() {
  try {
    const existingAdmin = await User.findOne({ email: "admin@gmail.com" });
    if (!existingAdmin) {
      // Ensure the hashed password is awaited
      const hashedPassword = await bcrypt.hash("admin", 10);

      // Create a new user instance and assign it to newUser
      const newUser = new User({
        name: "Admin",
        email: "admin@gmail.com",
        username: "admin",
        password: hashedPassword,
        role: "admin",
      });

      await newUser.save(); // Save the user to the database
      console.log("Admin account created successfully");
    } else {
      console.log("Admin already exists");
    }
  } catch (error) {
    console.error("Error creating admin account:", error);
  }
}

module.exports = createAdminAccount;
