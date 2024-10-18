const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InterventionTypeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  }
});

module.exports = mongoose.model('InterventionType', InterventionTypeSchema);
