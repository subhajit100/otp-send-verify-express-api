const express = require("express");
const router = express.Router();
const { Shop } = require("../models");

// 📌 **GET /api/shops** → Fetch all shops
router.get("/", async (req, res) => {
  try {
    const shops = await Shop.findAll();
    return res.status(200).json(shops);
  } catch (error) {
    return res.status(500).json({ error: "Error fetching shops", success: false });
  }
});

// 📌 **POST /api/shops** → Add a new shop
router.post("/", async (req, res) => {
  try {
    const newShop = await Shop.create(req.body);
    return res.status(201).json(newShop);
  } catch (error) {
    return res.status(500).json({ error: "Error adding shop", success: false });
  }
});

module.exports = router;
