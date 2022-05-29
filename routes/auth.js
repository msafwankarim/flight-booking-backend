const express = require("express");
const authController = require("../controllers/authController");

const authRouter = express.Router();

authRouter.post("/login", authController.login);
authRouter.post("/signup", authController.signup);

module.exports = authRouter;
