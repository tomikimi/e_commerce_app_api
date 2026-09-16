const express = require("express");
const orderRoute = express.Router();

orderRoute.get("/order", (req, res) => {
  console.log(res);
});

orderRoute.post("/order", (req, res) => {
  console.log(res);
});

orderRoute.put("/order/:id", (req, res) => {
  console.log(res);
});

orderRoute.delete("/order/:id", (req, res) => {
  console.log(res);
});

module.exports = orderRoute;
