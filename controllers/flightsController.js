const Flight = require("../models/Flight");

const getAllFlights = async (req, res) => {
  const query = req.query;
  console.log(query);

  let nextDay = new Date(req.query.departureDate);
  nextDay.setDate(nextDay.getDate() + 1);

  let mongoQuery = {
    "departure.location": { $regex: query.departureLocation, $options: "i" },
    "arrival.location": { $regex: query.destination, $options: "i" },
    "departure.date": {
      $gte: new Date(query.departureDate),
      $lte: new Date(nextDay),
    },
    seatsLeft: {
      $gte: query.seats * 1,
    },
  };
  console.log(mongoQuery);
  let flights = {};
  if ((query.tripType = "round-trip")) {
    // TODO: another query where arrival and departure locations will be swapped
    // arrivalLocation will be used
    // map the arrays and return array of round trips i.e.
    // [ {inbound: {Flight}, outbound: {Flight} }, {inbound: {Flight}, outbound: {Flight} } ... ]
  }
  flights = await Flight.find(mongoQuery);
  res.status(200).json({ flights });
};

module.exports.getAllFlights = getAllFlights;
