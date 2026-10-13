
const express = require("express");
const Portfolio = require("../models/Portfolio");

const router = express.Router();

// Get portfolio data
router.get("/", async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne();

    if (!portfolio) {
      return res.status(404).json({
        message: "Portfolio data not found"
      });
    }

    res.json(portfolio);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch portfolio data"
    });
  }
});

// Add portfolio data
router.post("/", async (req, res) => {
  try {
    const portfolio = await Portfolio.create(req.body);
    res.status(201).json(portfolio);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create portfolio data"
    });
  }
});

module.exports = router;
