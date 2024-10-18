const express = require("express");
const router = express.Router();
const Device = require("../models/Device");

router.get("/types", async (req, res) => {
  try {
    const devices = await Device.find();

    res.json({ devices });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// router.post("/add", async (req, res) => {
//   try {
//     const { name, model, manufacturer, serialNumber, dateOfManufacture } =
//       req.body;

//     const newDevice = new Device({
//       name,
//       model,
//       manufacturer,
//       serialNumber,
//       dateOfManufacture,
//     });

//     const savedDevice = await newDevice.save();
//     res.json(savedDevice);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

module.exports = router;
