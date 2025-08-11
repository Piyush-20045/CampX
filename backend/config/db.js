require("dotenv").config();
const mongoose = require("mongoose");

// connect to mongoDB
async function connectDB() {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "campX"
    })
        .then(() => console.log("Connected to mongoDB"))
        .catch((err) => console.error("Connection error", err))
}
module.exports = connectDB;