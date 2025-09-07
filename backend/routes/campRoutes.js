const express = require("express");
const Campground = require("../models/campModel")
const protect = require("../middleware/protect")
const route = express.Router();

route.get("/", async (req, res) => {
    try {
        const camps = await Campground.find().sort({ createdAt: -1 });
        res.json(camps);
    } catch (err) {
        res.status(500).json({ error: "Error in fetching campgrounds" })
    }
})

route.post("/", protect, async (req, res) => {
    try {
        const newCamps = await Campground.create({
            ...req.body,
            author: {
                id: req.user._id,
                name: req.user.name,
                email: req.user.email,
            },
        });
        const savedCamps = await newCamps.save();
        res.status(201).json(savedCamps);
    } catch (err) {
        res.status(500).json({ error: "Error in creating campground" })
    }
})

route.delete("/:id", protect, async (req, res) => {
    try {
        const camp = await Campground.findById(req.params.id)
        if (!camp) return res.status(404).json({ error: "Camp not found!" })

        // checking ownership
        if (camp.author.id !== req.user._id.toString()) {
            return res.status(403).json({ error: "Not authorized to delete this camp!" })
        }

        await camp.deleteOne();
        res.status(200).json({ message: "Camp deleted" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete the camp" })
    }
})

route.put("/:id", protect, async (req, res) => {
    try {
        const camp = await Campground.findById(req.params.id);
        if (!camp) return res.status(404).json({ error: "Camp not found!" })

        // checking ownership
        if (camp.author.id !== req.user._id.toString()) {
            return res.status(403).json({ error: "Not authorized to update this camp!" })
        }

        await camp.updateOne(req.body);
        res.status(200).json({ message: "Camp updated" });
    } catch (err) {
        res.status(500).json({ error: "Failed to update the camp" })
    }
})
module.exports = route;
