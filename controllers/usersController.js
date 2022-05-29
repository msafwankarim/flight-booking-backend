const User = require("../models/User");
const Flight = require("../models/Flight");
const Ticket = require("../models/Ticket");

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.status(200).json({ user });
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
};

const getTickets = async (req, res) => {
  const userId = req.params.id;
  try {
    const results = await User.findById(userId).select("tickets");

    console.log();

    const tickets = await Promise.all(
      results.tickets.map(async (elem) => {
        const ticket = await Ticket.findById(elem).populate([
          "inboundFlight",
          "outboundFlight",
          "passenger",
        ]);

        console.log(ticket);
        return ticket;
      })
    );
    res.status(200).json({ tickets });
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
};

module.exports = { getUser, getTickets };
