const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const campRoutes = require("./routes/campRoutes");
const app = express();

app.use(cors());
app.use(express.json());
connectDB();

app.use("/camps" , campRoutes);

app.listen(3000, () => {
    console.log("Serving on 3000 port");
})