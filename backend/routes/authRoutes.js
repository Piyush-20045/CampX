const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const express = require("express");

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

        res.status(201).json({ token, message: "Account created successfully" });
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

module.exports = router;