const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: [true, "Email already in use"],
  },
  password: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  cnic: {
    type: String,
    required: true,
    unique: [true, "CNIC already in use"],
  },
  phone: {
    type: String,
    required: true,
  },
  cc_name: {
    //credit card account title
    type: String,
    required: true,
  },
  cc_number: {
    type: String,
    required: true,
  },
  cvc: {
    type: String,
    required: true,
  },
  expiry: {
    type: String,
    required: true,
  },
  tickets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
    },
  ],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
