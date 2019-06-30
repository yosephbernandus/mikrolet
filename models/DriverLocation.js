const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const DriverLocationSchema = new Schema({
  driver: {
    type: Schema.Types.ObjectId,
    ref: "drivers"
  },
  name: {
    type: String
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

module.exports = Post = mongoose.model("driverLocation", DriverLocationSchema);
