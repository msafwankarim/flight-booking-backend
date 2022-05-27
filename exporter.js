const mongoose = require("mongoose");
const fs = require("fs");
const Flight = require("./models/Flight");

require("dotenv").config({ path: "./.env.local" });

// simple script that will modify
// flights data according to new flight schema

const CONNECTION_STRING = process.env.CONNECTION_STRING;

const AIRPORTS = {
  Karachi: "Jinnah International Airport",
  Islamabad: "Islamabad International Airport - IIAP",
  Lahore: "Allama Iqbal International Airport",
};

(async () => {
  try {
    await mongoose.connect(CONNECTION_STRING);
    console.log("Connected to db");
    const data = JSON.parse(fs.readFileSync("./dev-data/results.json"));

    const flights = data.map((elem) => {
      return {
        airline_name: elem.flightname,
        flightno: elem.flightno,
        departure: {
          date: new Date(elem.date),
          location: elem.departurecity,
          airport_name: `${AIRPORTS[elem.departurecity]}`,
        },
        arrival: {
          date: new Date(elem.date),
          location: elem.arrivalcity,
          airport_name: `${AIRPORTS[elem.arrivalcity]}`,
        },
        price: 13000,
      };
    });

    await Flight.deleteMany({});

    for (let i = 0; i < flights.length; i++) {
      let flight = flights[i];
      await Flight.create(flight);

      console.log(flight.flightno, "saved");
    }

    await mongoose.disconnect();
  } catch (e) {
    console.error(e);
  }
})();
