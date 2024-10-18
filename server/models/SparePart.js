const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SparePartSchema = new Schema({
  name: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('SparePart', SparePartSchema);