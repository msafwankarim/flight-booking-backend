const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  ticket_id: {
    type: Number,
    default: Date.now,
  },
  passenger: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  inboundFlight: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Flight",
  },
  outboundFlight: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Flight",
    required: true,
  },
  seats: {
    type: Number,
    default: 1,
  },
});

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
