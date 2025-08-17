const express = require("express");
const Campground = require("../models/campModel")

const route = express.Router();

route.get("/", async (req, res) => {
    try {
        const camps = await Campground.find().sort({ createdAt: -1 });
        res.json(camps);
    } catch (err) {
        res.status(500).json({ error: "Error in fetching campgrounds" })
    }
})

route.post("/", async (req, res) => {
    try {
        const newCamps = await Campground.create(req.body);
        const savedCamps = await newCamps.save();
        res.status(201).json(savedCamps);
    } catch (err) {
        res.status(500).json({ error: "Error in creating campground" })
    }
})

route.delete("/:id", async (req, res) => {
    try {
        await Campground.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Camp deleted"});
    } catch(err) {
        res.status(500).json({error: "Failed to delete the camp"})
    }
})
module.exports = route;
