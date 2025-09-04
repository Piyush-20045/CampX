const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const express = require("express");
const protect = require("../middleware/protect");

const router = express.Router();

// SignUp
router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const isEmailUnique = await User.findOne({ email });
        if (isEmailUnique) return res.status(400).json({ error: "Email already used!" });

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        // create token
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" })

        const user = await User.findOne({ email });
        res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email }, message: "Account created successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "Invalid email or password" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid email or password" })

        // create token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" })

        res.json({ token, user: { id: user._id, name: user.name, email: user.email }, message: "Login successfull" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

// update-name route
router.put("/update-name", protect, async (req, res) => {
    try {
        const { newName } = req.body;
        if (!newName) return res.status(400).json({ error: "Name required!" });

        req.user.name = newName;
        await req.user.save();

        res.json({ message: "Name updated", user: req.user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

// update-password route
router.put("/update-password", protect, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        // find user by _id (from protect middleware)
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Compare current password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) return res.status(400).json({ message: "Wrong current password" });

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;

        await user.save();

        res.json({ message: "Password updated!!" })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

module.exports = router;