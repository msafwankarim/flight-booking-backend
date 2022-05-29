const User = require("../models/User");
const Ticket = require("../models/Ticket");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw { status: 400, error: "Bad request, email or password not found" };
    }
    const user = await User.findOne({
      email: email,
      password: password,
    }).populate("tickets");
    if (!user) {
      throw { status: 404, error: "Incorrect email or password" };
    }

    res.status(200).json({ loginStatus: "success", user: user });
  } catch (e) {
    res.status(e.status).json({ loginStatus: "failed", error: e.error });
  }
};

const signup = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json({ signupStatus: "success", user: user });
  } catch (e) {
    console.log(e);
    res.status(400).json({ signupStatus: "failed", error: e.message });
  }
};

module.exports = { login, signup };
