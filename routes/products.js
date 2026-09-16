const express = require("express");
const productRoute = express.Router();

productRoute.get("/product", (req, res) => {
  console.log(res);
});

productRoute.post("/product", (req, res) => {
  console.log(res);
});

productRoute.put("/product/:id", (req, res) => {
  console.log(res);
});

productRoute.delete("/product/:id", (req, res) => {
  console.log(res);
});

module.exports = productRoute;
