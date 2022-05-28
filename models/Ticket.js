const mongoose = require("mongoose");

const passengerSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  cnic: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  cc_name: {
    //credit card account title
    type: String,
    required: true,
  },
  cc_number: {
    type: String,
    required: true,
  },
  cvv: {
    type: String,
    required: true,
  },
  expiry: {
    type: String,
    required: true,
  },
});

const ticketSchema = new mongoose.Schema({
  ticket_id: {
    type: Number,
    default: Date.now(),
  },
  passenger: passengerSchema,
  inboundFlight: { type: mongoose.Schema.Types.ObjectId, ref: "Flight" },
  outboundFlight: { type: mongoose.Schema.Types.ObjectId, ref: "Flight" },
  seats: {
    type: Number,
    default: 1,
  },
});

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
