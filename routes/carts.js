const express = require("express");
const pool = require("../db/index");
const cartRouter = express.Router();

cartRouter.get("/", async (req, res) => {
  try {
    const response = await pool.query(
      `SELECT PUBLIC.SELECT_CARTITEMS_FUNCTION($1)`,
      ["ALL"],
    );

    const result = response.rows[0].select_cartitems_function;

    if ((result.SUCCESS = true)) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    console.log(error);
  }
});

cartRouter.get("/:id", async (req, res) => {
  try {
    const userID = req.params.id;
    const response = await pool.query(
      `SELECT PUBLIC.SELECT_CARTITEMS_FUNCTION($1,$2)`,
      ["SELECT", userID],
    );

    const result = response.rows[0].select_cartitems_function;

    if ((result.SUCCESS = true)) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    console.log(error);
  }
});

// endpoint to create cart
cartRouter.post("/post/data", async (req, res) => {
  try {
    const { userID, productID, quantity } = req.body;
    const response = await pool.query(
      `SELECT PUBLIC.INSERT_CART_FUNCTION($1,$2,$3)`,
      [userID, productID, quantity],
    );

    const result = response.rows[0].insert_cart_function;
    if (result.SUCCESS === true) {
      res.status(201).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    console.log(error);
  }
});

// endpoint to checkout items
cartRouter.post("/post/checkout", async (req, res) => {
  try {
    const { userID, cartID } = req.body;

    const response = await pool.query(
      `SELECT PUBLIC.INSERT_ORDER_FUNCTION($1,$2,$3)`,
      [userID, cartID, "CHECKOUT"],
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

// endpoint to update item in cart
cartRouter.put("/update/cartItem/:id", async (req, res) => {
  try {
    const cartItemID = req.params.id;
    const { userID, cartID, productID, quantity } = req.body;
    const response = await pool.query(
      `SELECT PUBLIC.UPDATE_CART_FUNCTION($1,$2,$3,$4,$5)`,
      [userID, cartID, cartItemID, productID, quantity],
    );

    const result = response.rows[0].update_cart_function;

    if (result.SUCCESS === true) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    console.log(error);
  }
});

// endpoint to delete item from cart
cartRouter.delete("/delete/cartItem/:id", async (req, res) => {
  try {
    const cartItem = req.params.id;
    const { userID, cartID } = req.body;
    const response = await pool.query(
      `SELECT PUBLIC.DELETE_CARTITEMS_FUNCTION($1,$2,$3)`,
      [userID, cartID, cartItem],
    );

    const result = response.rows[0].delete_cartitems_function;

    if (result.SUCCESS === true) {
      res.status(201).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    console.log(error);
  }
});

// endpoint to delete cart
cartRouter.delete("/delete/cart/:id", async (req, res) => {
  try {
    const cartID = req.params.id;
    const { userID } = req.body;
    const response = await pool.query(
      `SELECT PUBLIC.DELETE_CART_FUNCTION($1,$2)`,
      [cartID, userID],
    );

    const result = response.rows[0].delete_cart_function;

    if (result.SUCCESS === true) {
      res.status(201).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {}
});

module.exports = cartRouter;
