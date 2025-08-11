const mongoose = require("mongoose");

const campgroundSchema = new mongoose.Schema({
    name: String,
    location: String,
    price: Number,
    image: String,
    description: String,
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model("Campground", campgroundSchema)