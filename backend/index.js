const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const campRoutes = require("./routes/campRoutes");
const authRoutes = require("./routes/authRoutes");
const app = express();

app.use(cors());
app.use(express.json());
connectDB();

app.use("/camps", campRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Serving on 3000 port");
})