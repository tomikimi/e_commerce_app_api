const express = require("express");
const loginRoute = express.Router();

loginRoute.get("/", (req, res) => {
  console.log(res);
});

module.exports = loginRoute;
