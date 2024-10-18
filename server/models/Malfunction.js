const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MalfunctionSchema = new Schema({
  type: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Malfunction', MalfunctionSchema);