const mongoose = require("mongoose");
const fs = require("fs");
const { flights } = require("./models/Flight-old");
require("dotenv").config({ path: "./.env.local" });

// simple script to import all the flights from mongodb cluster
//  and save it in json file

const CONNECTION_STRING = process.env.CONNECTION_STRING;

(async () => {
  try {
    await mongoose.connect(CONNECTION_STRING);
    console.log("Connected to database");
    let results = await flights.find({}, { _id: 0 });

    fs.writeFileSync("./dev-data/results.json", JSON.stringify(results));

    console.log("data written");
    await mongoose.disconnect();
  } catch (e) {
    console.error(e);
  }
})();
