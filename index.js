require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const twilio = require("twilio");
const { isValidIndianNumber, generateOtp } = require("./helper"); // Import functions

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(bodyParser.json());

// Twilio configuration
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// Temporary storage for OTP
let otpStore = {};


// Send OTP Endpoint
app.post("/api/send-otp", async (req, res) => {
    const { mobileNumber } = req.body;
  
    if (!mobileNumber || !isValidIndianNumber(mobileNumber)) {
      return res.status(400).json({ error: "Invalid Indian mobile number" });
    }
  
    try {
      const formattedNumber = mobileNumber.startsWith("+91") ? mobileNumber : `+91${mobileNumber}`;
      const otp = generateOtp();
      otpStore[formattedNumber] = otp;
  
      const message = await client.messages.create({
        body: `Your OTP is ${otp}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: formattedNumber,
      });
      console.log('message from twilio api: ', message)
  
      console.log(`OTP sent to ${formattedNumber}: ${otp}`);
      res.status(200).json({ success: true, message: "OTP sent successfully" });
    } catch (error) {
      console.error("Error sending OTP:", error);
      res.status(500).json({ success: false, error: "Failed to send OTP" });
    }
  });
  
  // Verify OTP Endpoint
  app.post("/api/verify-otp", (req, res) => {
    const { mobileNumber, otp } = req.body;
  
    if (!mobileNumber || !otp) {
      return res.status(400).json({ error: "Mobile number and OTP are required" });
    }
  
    if (!isValidIndianNumber(mobileNumber)) {
      return res.status(400).json({ error: "Invalid Indian mobile number" });
    }
  
    const formattedNumber = mobileNumber.startsWith("+91") ? mobileNumber : `+91${mobileNumber}`;
  
    if (otpStore[formattedNumber] === otp) {
      delete otpStore[formattedNumber];
      return res.status(200).json({ success: true, message: "OTP verified successfully" });
    } else {
      return res.status(400).json({ success: false, error: "Invalid OTP or expired" });
    }
  });

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });