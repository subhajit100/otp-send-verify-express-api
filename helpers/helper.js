// Generate a random 4-digit OTP
function generateOtp() {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }
  
  // Validate Indian mobile number (with or without +91)
  function isValidIndianNumber(mobileNumber) {
      const regex = /^(\+91)?[789]\d{9}$/;
      return regex.test(mobileNumber);
    }

  
// Optimized distance function for short distances
function getDistance(lat1, lon1, lat2, lon2) {
  const latDiff = (lat2 - lat1) * 111320; 
  const lonDiff = (lon2 - lon1) * 111320 * Math.cos((lat1 + lat2) / 2 * Math.PI / 180); 
  return Math.sqrt(latDiff * latDiff + lonDiff * lonDiff); 
}  

// Export the functions
module.exports = { isValidIndianNumber, generateOtp, getDistance };    