const express = require("express");
const pool = require("../db_config/db");
const router = express.Router();
const { body, validationResult } = require("express-validator");

// Middleware for input validation
const validateProductInput = [
  body("name").isString().notEmpty().withMessage("Name is required"),
  body("description")
    .isString()
    .notEmpty()
    .withMessage("Description is required"),
  body("price")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number"),
  body("quantity")
    .isInt({ gt: 0 })
    .withMessage("Quantity must be a positive integer"),
];

// GET: Fetch all products
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM productmanagement");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching products:", err); // Log detailed error
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
});

// POST: Add a new product
router.post("/", validateProductInput, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, description, price, quantity } = req.body;
  const query = `
    INSERT INTO productmanagement (name, description, price, quantity)
    VALUES ($1, $2, $3, $4) RETURNING *`;

  try {
    const result = await pool.query(query, [
      name,
      description,
      price,
      quantity,
    ]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT: Edit an existing product
router.put("/:id", validateProductInput, async (req, res) => {
  const { id } = req.params;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, description, price, quantity } = req.body;
  const query = `
    UPDATE productmanagement SET name = $1, description = $2, price = $3, quantity = $4
    WHERE id = $5 RETURNING *`;

  try {
    const result = await pool.query(query, [
      name,
      description,
      price,
      quantity,
      id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE: Delete a product
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (isNaN(id) || id <= 0) {
    return res.status(400).json({ error: "Invalid product ID" });
  }

  const query = "DELETE FROM productmanagement WHERE id = $1 RETURNING *";

  try {
    const result = await pool.query(query, [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({ success: "deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
