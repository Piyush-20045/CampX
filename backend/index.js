const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("This is home page from backend");
})

app.listen(3000, () => {
    console.log("Serving on 3000 port");
})