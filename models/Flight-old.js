const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  flightname: {
    type: String,
    required: true,
  },
  flightno: {
    type: String,
    required: true,
  },
  departurecity: {
    type: String,
    required: true,
  },
  arrivalcity: {
    type: String,
    required: true,
  },
  departuretime: {
    type: String,
    required: true,
  },
  arrivaltime: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

module.exports.flights = mongoose.model("flights", schema);
