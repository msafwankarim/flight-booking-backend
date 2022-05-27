const express = require("express");
const ticketsController = require("../controllers/ticketsController");

const ticketsRouter = express.Router();

ticketsRouter.post("/", ticketsController.createTicket);

ticketsRouter
  .route("/:id")
  .get(ticketsController.getTicket)
  .delete(ticketsController.cancelTicket);

module.exports = ticketsRouter;
