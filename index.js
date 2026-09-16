const express = require("express");
const categoryRouter = require("./routes/category");
const app = express();

app.use(express.json());

app.use("/category", categoryRouter);

module.exports = { app };
