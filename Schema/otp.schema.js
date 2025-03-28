const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  otp: {
    type: String,
    length: 6,
  },
  otpExpiry: {
    type: Date,
  },
  used: {
    type: Boolean,
    default: false,
  },
});

const OTP = mongoose.model("OTP", otpSchema);
module.exports = { OTP };
