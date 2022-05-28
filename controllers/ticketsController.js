const Ticket = require("../models/Ticket");

const createTicket = async (req, res) => {
  try {
    const ticket = await Ticket.create(req.body);
    res.status(200).json({
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
    const ticket = await Ticket.findOne({ ticket_id: req.params.id }).populate(
      "inboundFlight"
    );
    console.log(ticket);
    if (!ticket)
      return res.status(404).json({ error: "Ticket id doesn't exist" });

    res.status(200).json(ticket);
  } catch (e) {
    res
      .status(404)
      .json({ error: "Incorrect ticket number or ticket doesn't exist" });

    console.log(e);
  }
};

const cancelTicket = async (req, res) => {
  try {
    await Ticket.findOneAndDelete({ ticket_id: req.params.id });
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
