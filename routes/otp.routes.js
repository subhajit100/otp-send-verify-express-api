const express = require("express");
const router = express.Router();
const { User } = require("../models");
const { isValidIndianNumber, generateOtp } = require("../helpers/helper");

// Temporary storage for OTP
let otpStore = {};

// Send OTP Endpoint
router.post("/send", async (req, res) => {
  const { mobileNumber } = req.body;

  if (!mobileNumber || !isValidIndianNumber(mobileNumber)) {
    return res.status(400).json({ error: "Mobile number invalid or missing" });
  }

  try {
    const formattedNumber = mobileNumber.startsWith("+91")
      ? mobileNumber
      : `+91${mobileNumber}`;
    const otp = generateOtp();
    otpStore[formattedNumber] = otp;

    // TODO:- Uncomment this when real scenario
    //   const message = await client.messages.create({
    //     body: `Your OTP is ${otp}`,
    //     from: process.env.TWILIO_PHONE_NUMBER,
    //     to: formattedNumber,
    //   });
    //   console.log('message from twilio api: ', message)

    let user = await User.findOne({ where: { mobileNumber } });

    if (!user) {
      user = await User.create({ mobileNumber }); // Create new user
    }
    res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ success: false, error: "Failed to send OTP" });
  }
});

// Verify OTP Endpoint
router.post("/verify", async (req, res) => {
  // TODO:- Uncomment this when real scenario
  const { mobileNumber, otp } = req.body;

  if (!mobileNumber || !otp) {
    return res
      .status(400)
      .json({ error: "Mobile number and OTP are required" });
  }

  if (!isValidIndianNumber(mobileNumber)) {
    return res.status(400).json({ error: "Invalid Indian mobile number" });
  }

  const formattedNumber = mobileNumber.startsWith("+91")
    ? mobileNumber
    : `+91${mobileNumber}`;

  // if (otpStore[formattedNumber] === otp) {
  //   delete otpStore[formattedNumber];
  //   return res.status(200).json({ success: true, message: "OTP verified successfully" });
  // } else {
  //   return res.status(400).json({ success: false, error: "Invalid OTP or expired" });
  // }
  // TODO:- I have to send the user here, when it is verified properly.
  try {
    // Find user by ID
    let user = await User.findOne({ where: { mobileNumber } });
    if (!user) {
      return res.status(404).json({ error: "User not found", success: false });
    }
    return res
      .status(200)
      .json({
        success: true,
        message: "OTP verified successfully",
        user: user,
      });
  } catch (err) {
    res.status(500).json({ error: "Failed to verify OTP", success: false });
  }
});
