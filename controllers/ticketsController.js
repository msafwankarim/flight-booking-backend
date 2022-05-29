const Ticket = require("../models/Ticket");
const User = require("../models/User");

const createTicket = async (req, res) => {
  try {
    const ticket = await Ticket.create(req.body);
    const user = await User.findByIdAndUpdate(ticket.passenger, {
      $push: { tickets: ticket._id },
    });
    res.status(200).json({
      status: "success",
      ticket,
    });
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
    console.log(e);
  }
};

const getTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findOne({ ticket_id: req.params.id }).populate([
      "inboundFlight",
      "outboundFlight",
      "passenger",
    ]);
    console.log(ticket);
    if (!ticket)
      return res.status(404).json({ error: "Ticket id doesn't exist" });

    res.status(200).json({ ticket });
  } catch (e) {
    res
      .status(404)
      .json({ error: "Incorrect ticket number or ticket doesn't exist" });

    console.log(e);
  }
};

const cancelTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findOne({ ticket_id: req.params.id });

    await User.findByIdAndUpdate(ticket.passenger, {
      $pull: { tickets: ticket._id },
    });
    await Ticket.findByIdAndRemove(ticket._id);

    res.status(201).json({ status: "success" });
  } catch (e) {
    res.status(404).json({
      error: e.message,
    });
    console.log(e);
  }
};

module.exports.createTicket = createTicket;
module.exports.getTicket = getTicket;
module.exports.cancelTicket = cancelTicket;
