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
    console.log(error);
  }
};

const getTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    res.status(200).json({ ticket });
  } catch (e) {
    res
      .status(404)
      .json({ error: "Incorrect ticket number or ticket doesn't exist" });

    console.log(error);
  }
};

const cancelTicket = async (req, res) => {
  try {
    await Ticket.findOneAndDelete(req.params.id);
    res.status(201);
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
