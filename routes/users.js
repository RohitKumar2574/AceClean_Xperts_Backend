const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Create a new user
router.post('/add', async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.json(savedUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
