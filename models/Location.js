const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const LocationSchema = new Schema({
  users: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  name: {
    type: String
  },
  status: {
    type: String
  },
  seat: {
    type: String,
    default: "0"
  },
  kodePlatNomor: {
    type: String
  },
  trayek: {
    type: String
  },
  latitude: {
    type: String
  },
  longitude: {
    type: String
  }
});

module.exports = Driver = mongoose.model("location", LocationSchema);
