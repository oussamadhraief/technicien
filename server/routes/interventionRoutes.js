const express = require("express");
const router = express.Router();
const InterventionType = require("../models/InterventionType");
const Intervention = require("../models/Intervention");
const authMiddleware = require("../middlewares/authMiddleware");
const multer = require('multer');
const path = require('path');
const Device = require("../models/Device");
const Malfunction = require("../models/Malfunction");
const SparePart = require("../models/SparePart");
const moment = require("moment/moment");

// Configure storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });


router.get("/find/:id", async (req, res) => {
  try {
    const intervention = await Intervention.findById(req.params.id)
    .populate({
      path: "device",
      select: "name",
    })
    .populate({
      path: "user",
      select: "username",
    })
    .populate({
      path: "malfunction",
      select: "type",
    })
    .populate({
      path: "sparePart",
      select: "name",
    })
    .populate({
      path: "interventionType",
      select: "name",
    })

    if (!intervention) return res.status(404).json({ error: 'Intervention not found' });
    res.json(intervention);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const interventions = await Intervention.find()
      .select("clientName location status")
      .populate({
        path: "device",
        select: "name",
      })
      .limit(5);

    res.json({ interventions });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/count", async (req, res) => {
  try {
    const interventions = await Intervention.countDocuments()

    res.json({ interventions });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/line-chart', async (req, res) => {
  try {
    const thirtyDaysAgo = moment().subtract(30, 'days').startOf('day').toDate();
    
    const interventions = await Intervention.aggregate([
      {
        $match: {
          createdAt: { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%d/%m", date: "$createdAt" } }, 
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id': 1 }
      }
    ]);    

    const interventionsData = interventions.map(intervention => ({
      interventions: intervention._id, 
      val: intervention.count
    }));

    res.json(interventionsData);
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});

router.get('/pie-chart', async (req, res) => {
  try {
    const deviceFrequencies = await Intervention.aggregate([
      {
        $lookup: {
          from: 'devices', 
          localField: 'device', 
          foreignField: '_id', 
          as: 'device'
        }
      },
      { $unwind: '$device' }, 
      {
        $group: {
          _id: '$device.model', 
          count: { $sum: 1 } 
        }
      },
      {
        $sort: { count: -1 } 
      }
    ]);

    
    const responseData = deviceFrequencies.map(device => ({
      boitier: device._id,
      frequency: device.count
    }));

    res.json(responseData);
  } catch (error) {
    console.error('Error fetching device frequencies:', error);
    res.status(500).json({ error: 'Failed to fetch device frequencies' });
  }
});

router.get("/types", async (req, res) => {
  try {
    const interventionTypes = await InterventionType.find();

    res.json({ interventionTypes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/add", authMiddleware, upload.single('photo'), async (req, res) => {
  try {
    const {
      clientName,
      location,
      device,
      technicianId,
      deviceId,
      status,
      malfunction,
      interventionType,
      based,
      sparePart,
    } = req.body;
    
    const photo = req.file ? req.file.path : '';

    const deviceExists = await Device.findById(device);
    if (!deviceExists) return res.status(400).json({ error: 'Device not found' });

    const interventionTypeExists = await InterventionType.findById(interventionType);
    if (!interventionTypeExists) return res.status(400).json({ error: 'InterventionType not found' });

    const malfunctionExists = await Malfunction.findById(malfunction);
    if (!malfunctionExists) return res.status(400).json({ error: 'Malfunction not found' });

    const sparePartExists = await SparePart.findById(sparePart);
    if (!sparePartExists) return res.status(400).json({ error: 'SparePart not found' });
    console.log(req.user._id);
    
    const newIntervention = new Intervention({
      user: req.user._id,
      clientName,
      location,
      device,
      technicianId,
      deviceId,
      status,
      malfunction,
      interventionType,
      photo,
      based,
      sparePart,
    });
    
    const savedIntervention = await newIntervention.save();
    console.log("created");
    res.json(savedIntervention);
  } catch (err) {
    console.log(err);
    
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;
