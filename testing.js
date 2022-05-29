const { default: mongoose } = require("mongoose");
const Flight = require("./models/Flight");
const Ticket = require("./models/Ticket");
const User = require("./models/User");

require("dotenv").config({ path: "./.env.local" });

const CONNECTION_STRING = process.env.CONNECTION_STRING;

(async () => {
  try {
    await mongoose.connect(CONNECTION_STRING);
    console.log("Connected to db");

    await Ticket.deleteMany({});
    await mongoose.disconnect();
  } catch (e) {
    console.error(e);
  }
})();
