const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const DriverSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  nomor: {
    type: String,
    required: true
  },
  kode: {
    type: String,
    required: true
  },
  trayek: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Driver = mongoose.model("drivers", DriverSchema);
