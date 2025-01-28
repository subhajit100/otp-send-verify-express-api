// Generate a random 4-digit OTP
function generateOtp() {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }
  
  // Validate Indian mobile number (with or without +91)
  function isValidIndianNumber(mobileNumber) {
      const regex = /^(\+91)?[789]\d{9}$/;
      return regex.test(mobileNumber);
    }

// Export the functions
module.exports = { isValidIndianNumber, generateOtp };    