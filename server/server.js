const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const interventionRoutes = require('./routes/interventionRoutes');
const deviceRoutes = require('./routes/deviceRoutes');
const malfunctionRoutes = require('./routes/malfunctionRoutes');
const sparepartRoutes = require('./routes/sparepartRoutes');


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:8100","http://192.168.1.17:8100"],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/interventions', interventionRoutes);
app.use('/api/devices', deviceRoutes);
app.use('/api/malfunctions', malfunctionRoutes);
app.use('/api/spareparts', sparepartRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
