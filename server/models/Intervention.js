const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InterventionSchema = new Schema({
  clientName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  technicianId: {
    type: String,
    required: true,
  },
  user : {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  device: {
    type: Schema.Types.ObjectId,
    ref: 'Device',
    required: true,
  },
  deviceId: {
    type: String,
    required: true,
  },
  interventionType: {
    type: Schema.Types.ObjectId,
    ref: 'InterventionType',
    required: true,
  },
  malfunction: {
    type: Schema.Types.ObjectId,
    ref: 'Malfunction',
    required: true,
  },
  sparePart: {
    type: Schema.Types.ObjectId,
    ref: 'SparePart',
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'Complete'],
    default: 'Pending',
  },
  photo: {
    type: String,
    required: true,
  },
  based: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Intervention', InterventionSchema);
