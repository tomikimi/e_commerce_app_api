const express = require("express");
const pool = require("../db/index");
const productRoute = express.Router();

productRoute.get("/", async (req, res) => {
  try {
    if (Object.keys(req["query"]).length > 0) {
      const { category } = req["query"];
      const response = await pool.query(
        `SELECT PUBLIC.SELECT_PRODUCT_FUNCTION($1)`,
        [category],
      );
      const result = response.rows[0].select_product_function;
      if (result.SUCCESS === true) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } else {
      const response = await pool.query(
        `SELECT PUBLIC.SELECT_PRODUCT_FUNCTION()`,
        [],
      );
      const result = response.rows[0].select_product_function;
      if (result.SUCCESS === true) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    }
  } catch (error) {
    console.log(error);
  }
});

productRoute.post("/post/data", async (req, res) => {
  try {
    const {
      productName,
      description,
      categoryID,
      unitPrice,
      currency,
      quantity,
      status,
    } = req.body;
    const response = await pool.query(
      `SELECT PUBLIC.INSERT_PRODUCTS_FUNCTION($1,$2,$3,$4,$5,$6,$7)`,
      [
        productName,
        description,
        categoryID,
        unitPrice,
        currency,
        quantity,
        status,
      ],
    );
    const result = response.rows[0].insert_products_function;
    if (result.SUCCESS === true) {
      res.status(201).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    console.log(error);
  }
});

productRoute.put("/update/:id", async (req, res) => {
  try {
    const productID = parseInt(req.params.id);
    const {
      productName,
      description,
      categoryID,
      unitPrice,
      currency,
      quantity,
      status,
    } = req.body;
    const response = await pool.query(
      `SELECT PUBLIC.UPDATE_PRODUCTS_FUNCTION($1,$2,$3,$4,$5,$6,$7,$8)`,
      [
        productID,
        productName,
        description,
        categoryID,
        unitPrice,
        currency,
        quantity,
        status,
      ],
    );

    const result = response.rows[0].update_products_function;
    if (result.SUCCESS === true) {
      res.status(200).json(result);
    } else {
      res.status(401).json(result);
    }
  } catch (error) {
    console.log(error);
  }
});

productRoute.delete("/delete/:id", async (req, res) => {
  try {
    const productID = parseInt(req.params.id);

    const response = await pool.query(
      `SELECT PUBLIC.DELETE_PRODUCT_FUNCTION($1)`,
      [productID],
    );

    const result = response.rows[0].delete_product_function;
    if (result.SUCCESS === true) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = productRoute;
