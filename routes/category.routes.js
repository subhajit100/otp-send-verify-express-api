const express = require("express");
const router = express.Router();
const { Category } = require("../models");

// 📌 **GET /api/categories** → Fetch all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.findAll();
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ error: "Error fetching categories", success: false });
  }
});

// 📌 **POST /api/categories** → Add a new category
router.post("/", async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    return res.status(201).json(newCategory);
  } catch (error) {
    return res.status(500).json({ error: "Error adding category", success: false });
  }
});

module.exports = router;
