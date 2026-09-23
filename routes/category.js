const express = require("express");
const pool = require("../db/index");
const categoryRoute = express.Router();

categoryRoute.get("/get/:id", async (req, res) => {
  try {
    const categoryID = parseInt(req.params.id);

    const response = await pool.query(
      `SELECT SELECT_CATEGORY_ITEM_FUNCTION($1)`,
      [categoryID],
    );

    const result = response.rows[0].select_category_item_function;

    if (result.SUCCESS === true) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    console.log(error);
  }
});

categoryRoute.post("/post/data", async (req, res) => {
  try {
    const { name } = req.body;
    const response = await pool.query(
      `SELECT PUBLIC.INSERT_CATEGORY_FUNCTION($1)`,
      [name],
    );
    const result = response.rows[0].insert_category_function;
    if (result.SUCCESS === true) {
      res.status(201).json(result);
    } else {
      res.status(401).json(result);
    }
  } catch (error) {
    console.log(error);
  }
});

categoryRoute.put("/update/:id", async (req, res) => {
  try {
    const categoryID = parseInt(req.params.id);
    console.log(categoryID);
    const { name } = req.body;
    const response = await pool.query(
      `SELECT PUBLIC.UPDATE_CATEGORY_FUNCTION($1,$2)`,
      [categoryID, name],
    );

    const result = response.rows[0].update_category_function;
    if (result.SUCCESS === true) {
      res.status(200).json(result);
    } else {
      res.status(401).json(result);
    }
  } catch (error) {
    console.log(error);
  }
});

categoryRoute.delete("/delete/:id", async (req, res) => {
  try {
    const categoryID = parseInt(req.params.id);

    const response = await pool.query(`SELECT DELETE_CATEGORY_FUNCTION($1)`, [
      categoryID,
    ]);

    const result = response.rows[0].delete_category_function;
    if (result.SUCCESS === true) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = categoryRoute;
