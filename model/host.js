const mongoose = require('mongoose');

const Host = mongoose.model('Host', new mongoose.Schema({
  ip: {
    type: String,
    required: true,
    unique: true,
  },
  geo: Object,
  visit_count: {
    type: Number,
    default: 1,
  },
}));

module.exports = Host;
