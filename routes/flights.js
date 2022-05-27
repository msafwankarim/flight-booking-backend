const express = require("express");
const flightsController = require("../controllers/flightsController");

const flightsRouter = express.Router();

flightsRouter.get("/", flightsController.getAllFlights);

module.exports = flightsRouter;
