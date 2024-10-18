const express = require("express");
const router = express.Router();
const SparePart = require("../models/SparePart");

router.get("/types", async (req, res) => {
  try {
    const spareParts = await SparePart.find();

    res.json({ spareParts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
