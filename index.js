const express = require("express");
const categoryRouter = require("./routes/category");
const userRouter = require("./routes/users");
const app = express();

app.use(express.json());

app.use("/category", categoryRouter);
app.use("/users", userRouter);

module.exports = { app };
