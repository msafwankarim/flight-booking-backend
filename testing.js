const { default: mongoose } = require("mongoose");
const Flight = require("./models/Flight");
const Ticket = require("./models/Ticket");

require("dotenv").config({ path: "./.env.local" });

// simple script that will modify
// flights data according to new flight schema

const CONNECTION_STRING = process.env.CONNECTION_STRING;

(async () => {
  try {
    await mongoose.connect(CONNECTION_STRING);
    console.log("Connected to db");

    await mongoose.disconnect();
  } catch (e) {
    console.error(e);
  }
})();
