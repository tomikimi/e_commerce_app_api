const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { hashPassword, comparePassword } = require("../util/hashPassword");
const pool = require("../db/index");

const authenticateRoute = express.Router();

passport.serializeUser((user, done) => {
  return done(null, user.userID);
});

passport.deserializeUser(async (user, done) => {
  try {
    const response = await pool.query(
      `SELECT PUBLIC.SELECT_USER_FUNCTION($1)`,
      [user],
    );
    const result = response.rows[0].select_user_function;

    if (result.SUCCESS === true) {
      return done(null, result);
    } else {
      return done(null, false, { message: "user not found" });
    }
  } catch (error) {
    return done(null, error, { message: "user not found" });
  }
});

passport.use(
  new LocalStrategy(async function (username, password, done) {
    try {
      const response = await pool.query(
        `SELECT PUBLIC.SELECT_USER_LOGIN_FUNC($1)`,
        [username],
      );
      const result = response.rows[0].select_user_login_func;

      if (result.SUCCESS === true) {
        console.log(result.DATA);
        const comparePswdResult = await comparePassword(
          password,
          result.DATA[0].password,
        );
        if (comparePswdResult === false) {
          return done(null, false, {
            message: "Incorrect Username or Password",
          });
        }
        return done(null, result.DATA[0]);
      } else {
        return done(null, false, { message: "Incorrect Username or Password" });
      }
    } catch (err) {
      console.log(err);
      return done(err);
    }
  }),
);

authenticateRoute.post(
  "/userLogin",
  passport.authenticate("local"),
  async (req, res) => {
    // console.log("USER:", req.user);
    // console.log("SESSION:", req.session);
    // console.log("SESSION ID:", req.sessionID);
    // console.log("cookie", req.isAuthenticated());

    try {
      const { _expires } = req.session.cookie;
      const response = await pool.query(
        `SELECT PUBLIC.GENERAL_SESSION_FUNCTION($1,$2,$3,$4)`,
        [req.user.userID, req.sessionID, "INSERT", _expires],
      );

      const result = response.rows[0].general_session_function;
      if (result.SUCCESS === true) {
        res.status(200).json({
          message: "Login Successful",
        });
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.log(error);
    }
  },
);

authenticateRoute.get("/getProfile", (req, res) => {
  console.log(req.user);
});

module.exports = authenticateRoute;
