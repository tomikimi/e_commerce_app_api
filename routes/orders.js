const express = require("express");
const pool = require("../db/index");
const orderRoute = express.Router();

// Get all Orders
orderRoute.get("/", async (req, res) => {
  try {
    const response = await pool.query(
      `SELECT PUBLIC.SELECT_ORDERS_FUNCTION($1)`,
      ["ALL"],
    );

    const result = response.rows[0].select_orders_function;
    if (result.SUCCESS === true) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    console.log(error);
  }
});

// Get Order by ID
orderRoute.get("/get/Order/:id", async (req, res) => {
  try {
    const orderId = req.params.id;
    const { userID } = req.body;
    const response = await pool.query(
      `SELECT PUBLIC.SELECT_ORDERS_FUNCTION($1,$2,$3)`,
      ["SELECT", orderId, userID],
    );

    const result = response.rows[0].select_orders_function;
    if (result.SUCCESS === true) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    console.log(error);
  }
});

// Submit Order for Processing
orderRoute.post("/post/:orderID/order", async (req, res) => {
  try {
    const { userID, cartID } = req.body;
    const orderNumber = req.params.orderID;
    const response = await pool.query(
      `SELECT PUBLIC.INSERT_ORDER_FUNCTION($1,$2,$3,$4)`,
      [userID, cartID, "SUBMIT_ORDER", orderNumber],
    );

    const result = response.rows[0].insert_order_function;
    if (result.SUCCESS === true) {
      res.status(201).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    console.log(error);
  }
});

orderRoute.put("/order/:id", (req, res) => {
  console.log(res);
});

orderRoute.delete("/order/:id", (req, res) => {
  console.log(res);
});

module.exports = orderRoute;
