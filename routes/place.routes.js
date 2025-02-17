const express = require("express");
const router = express.Router();
const { Place } = require("../models");
const { getDistance } = require("../helpers/helper");

// POST:- add a new place by admin
router.post("/", async (req, res) => {
  try {
    const newPlace = await Place.create(req.body);
    return res.status(201).json(newPlace);
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Error adding place" });
  }
});

router.post("/search", async (req, res) => {
  let { category, lat, lng, searchRadius } = req.body;

  if (
    category == undefined ||
    lat === undefined ||
    lng === undefined ||
    searchRadius == undefined
  ) {
    return res
      .status(400)
      .json({ error: "Missing required fields", success: false });
  }

  category = Number(category);
  lat = Number(lat);
  lng = Number(lng); 
  searchRadius = Number(searchRadius); 

  if (isNaN(category) || isNaN(lat) || isNaN(lng) || isNaN(searchRadius)) {
    return res
      .status(400)
      .json({
        error: "Invalid category or latitude or longitude or searchRadius",
        success: false,
      });
  }

  try {
    // Fetch places from DB with matching category_id
    const places = await Place.findAll({ where: { category_id: category } });

    // Filter places within the search radius
    const nearbyPlaces = places.filter((place) => {
      const placeLat = parseFloat(place.lat);
      const placeLng = parseFloat(place.lng);
      return getDistance(lat, lng, placeLat, placeLng) <= searchRadius;
    });

    res.json({ success: true, nearbyPlaces });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", success: false });
  }
});

module.exports = router;
