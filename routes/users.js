const express = require("express");
const usersController = require("../controllers/usersController");

const usersRouter = express.Router();

usersRouter.get("/:id", usersController.getUser);
usersRouter.get("/:id/tickets", usersController.getTickets);

module.exports = usersRouter;
