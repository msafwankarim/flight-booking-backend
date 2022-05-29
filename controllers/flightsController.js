const Flight = require("../models/Flight");

const findFlights = async ({ departure, arrival, date, isFlexible, seats }) => {
  let startDate = new Date(date),
    dateLimit = new Date(date);
  dateLimit.setDate(dateLimit.getDate() + 1);

  // if dates are flexible
  // then search flights that are available in 4 days
  if (isFlexible) {
    startDate.setDate(startDate.getDate() - 2);
    dateLimit.setDate(dateLimit.getDate() + 2);
  }

  const mongoQuery = {
    "departure.location": { $regex: departure, $options: "i" },
    "arrival.location": { $regex: arrival, $options: "i" },
    "departure.date": {
      $gte: startDate,
      $lte: dateLimit,
    },
    seatsLeft: {
      $gte: seats,
    },
  };
  console.log(mongoQuery);
  return await Flight.find(mongoQuery);
};

const cartesian = (...all) => {
  const loop = (t, a, ...more) =>
    a === undefined ? [t] : a.flatMap((x) => loop([...t, x], ...more));
  return loop([], ...all);
};

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

  let flights = await findFlights({
    departure: query.departureLocation,
    arrival: query.destination,
    date: query.departureDate,
    isFlexible: query.dateFlexible == "true",
    seats: seats,
  });
  let results = flights;

  if (query.tripType === "round-trip") {
    // TODO: another query where arrival and departure locations will be swapped
    // arrivalLocation will be used
    // map the arrays and return array of round trips i.e.
    // [ {inbound: {Flight}, outbound: {Flight} }, {inbound: {Flight}, outbound: {Flight} } ... ]
    results = [];
    let returnFlights = await findFlights({
      departure: query.destination,
      arrival: query.departureLocation,
      date: query.returnDate,
      isFlexible: query.dateFlexible == "true",
      seats: seats,
    });

    for (let flight of flights) {
      for (let r_flight of returnFlights) {
        results.push({
          outboundFlight: flight,
          inboundFlight: r_flight,
        });
      }
    }
  }

  res.status(200).json({
    roundTrips: query.tripType === "round-trip",
    lenght: results.length,
    results,
  });
};

module.exports.getAllFlights = getAllFlights;
