const express = require("express");
const pool = require("../db/index");
const userRoute = express.Router();

userRoute.get("/user", (req, res) => {
  console.log(res);
});

userRoute.post("/user", async (req, res) => {
  try {
    const {} = req.body();
    const response = await pool.query();
  } catch (error) {}

  console.log(res);
});

userRoute.put("/user/:id", (req, res) => {
  console.log(res);
});

userRoute.delete("/user/:id", (req, res) => {
  console.log(res);
});

module.exports = userRoute;
