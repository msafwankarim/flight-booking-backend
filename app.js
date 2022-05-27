const express = require("express");
const cors = require("cors");
const flightsRouter = require("./routes/flights");
const ticketsRouter = require("./routes/tickets");

const app = express();

app.use(cors());
app.use(express.json());

// logger
app.use((req, res, next) => {
  console.log(`${req.path}\t${req.params}\t${req.query}`);
  next();
});

app.use("/api/flights", flightsRouter);
app.use("/api/tickets", ticketsRouter);

// 404 Handler
app.all("/*", (req, res, next) => {
  res.status(404).json({ error: `Path ${req.path} does not exist` });
});

module.exports = app;
