const Flight = require("../models/Flight");

const getAllFlights = async (req, res) => {
  const query = req.query;
  console.log(query);

  if (
    Object.keys(query).length == 0 ||
    !query.departureLocation ||
    !query.destination ||
    !query.departureDate
  )
    return res.status(400).json({ error: "Bad request" });

  const seats = query.seats * 1 || 1;
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
      $gte: seats,
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
