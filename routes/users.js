const express = require("express");
const pool = require("../db/index");
const { hashPasswordMiddleWare } = require("../util/hashPassword");
const userRoute = express.Router();

userRoute.get("/getUser/:id", async (req, res) => {
  try {
    const userID = parseInt(req.params.id);
    const response = await pool.query(
      `SELECT PUBLIC.SELECT_USER_FUNCTION($1)`,
      [userID],
    );

    // console.log("USER:", req.user);
    // console.log("SESSION:", req.session);
    // console.log("SESSION ID:", req.sessionID);
    // console.log("cookie", req.isAuthenticated());

    const result = response.rows[0].select_user_function;

    console.log(result);

    if (result.SUCCESS === true) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    console.log(error);
  }
});

userRoute.post("/postUser", hashPasswordMiddleWare, async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, homeAddress, state } =
      req.body;
    const userPassword = req.passwordHash;

    const response = await pool.query(
      `SELECT PUBLIC.INSERT_USERS_FUNC($1,$2,$3,$4,$5,$6,$7)`,
      [
        firstName,
        lastName,
        email,
        phoneNumber,
        homeAddress,
        state,
        userPassword,
      ],
    );

    const result = response.rows[0].insert_users_func;

    if (result.SUCCESS === true) {
      res.status(201).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    console.log(error);
  }
});

userRoute.put("/updateUser/:id", async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, homeAddress, state } = req.body;
    const userID = parseInt(req.params.id);

    const response = await pool.query(
      `SELECT PUBLIC.UPDATE_USER_FUNCTION($1,$2,$3,$4,$5,$6)`,
      [userID, firstName, lastName, phoneNumber, homeAddress, state],
    );

    const result = response.rows[0].update_user_function;
    if (result.SUCCESS === true) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    console.log(error);
  }
});

userRoute.delete("/deleteUser/:id", async (req, res) => {
  try {
    const userID = parseInt(req.params.id);
    const response = await pool.query(
      `SELECT PUBLIC.DELETE_USERS_FUNCTION($1)`,
      [userID],
    );

    const result = response.rows[0].delete_users_function;
    if (result.SUCCESS === true) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = userRoute;
