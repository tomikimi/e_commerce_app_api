const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const pool = require("../db/index");
const loginRoute = express.Router();

loginRoute.get("/", (req, res) => {
  console.log(res);
});

module.exports = loginRoute;
