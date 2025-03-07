const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const router = express.Router();

// Register User
router.post("/create-user", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, error: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });

        await newUser.save();

        res.status(201).json({ success: true, message: "User registered successfully" });
    } catch (error) {
        console.error("Error in /api/create-user:", error.message); // Debugging log
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});

// Login User
router.post("/login-user", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
