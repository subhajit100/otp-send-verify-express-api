require("dotenv").config();
const express = require("express");
const twilio = require("twilio");
const { isValidIndianNumber, generateOtp, getDistance } = require("./helpers/helper"); // Import functions
const { places } = require("./helpers/places");
const { shops } = require("./helpers/shops");

const otpRoutes = require("./routes/otp.routes");
const placeRoutes = require("./routes/place.routes");
const categoryRoutes = require("./routes/category.routes");
const shopRoutes = require("./routes/shop.routes");
const db = require("./models");

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());

app.use("/images", express.static("public/images"));

// Twilio configuration
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);


// const categoriesData = ["restroom", "retail", "parking", "spiritual"];
// const getCategoryString = (categoryIndex) => {
//   if(categoryIndex<0 && categoryIndex>categoriesData.length){
//     return undefined;
//   }
//   return categoriesData[categoryIndex-1];
// }

// Register API routes
app.use("/api/otp", otpRoutes);
app.use("/api/places", placeRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/shops", shopRoutes);

// GET: Return list of categories
// app.get("/api/categories", (req, res) => {
//   const categories = Object.keys(places).map((category, index) => ({
//       id: index + 1,
//       name: category.charAt(0).toUpperCase() + category.slice(1),
//       icon: `/images/${category}.png`
//   }));
//   res.json({ categories });
// });


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

