const express = require("express");
const router = express.Router();
const Malfunction = require("../models/Malfunction");

router.get("/types", async (req, res) => {
  try {
    const malfunctions = await Malfunction.find();

    res.json({ malfunctions });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
