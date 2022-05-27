const mongoose = require("mongoose");

const flightLocationSchema = {
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  airport_name: {
    type: String,
    required: true,
  },
};

const flightSchema = new mongoose.Schema({
  airline_name: {
    type: String,
    required: true,
  },
  flightno: {
    type: String,
    required: true,
  },
  departure: flightLocationSchema,
  arrival: flightLocationSchema,
  price: {
    type: Number,
    required: true,
  },
  isRefundable: {
    type: Boolean,
    default: true,
  },
  seatsLeft: {
    type: Number,
    default: 50,
  },
});

const Flight = mongoose.model("Flight", flightSchema);

module.exports = Flight;
