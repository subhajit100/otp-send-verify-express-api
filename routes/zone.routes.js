const express = require("express");
const router = express.Router();
const {Zone} = require('../models');
const {ZonePos} = require('../models');

// 📌 GET /api/zones → Fetch all zones with their associated zone positions
router.get("/", async (req, res) => {
  try {
    const zones = await Zone.findAll({
      include: [
        {
          model: ZonePos,
          as: "ZonePositions"
        }
      ]
    });

    return res.status(200).json(zones);
  } catch (error) {
    console.error("Error fetching zones: ", error);
    return res.status(500).json({ error: "Error fetching zones", success: false });
  }
});

router.patch("/:zoneId/zonepos/:zonePosId", async (req, res) => {
    const { zoneId, zonePosId } = req.params;
    const { lat, lng } = req.body;
  
    if (typeof lat !== "number" || typeof lng !== "number") {
      return res.status(400).json({ error: "Invalid lat/lng values", success: false });
    }
  
    try {
      const zonePos = await ZonePos.findOne({
        where: { id: zonePosId, zoneId }
      });
  
      if (!zonePos) {
        return res.status(404).json({ error: "Zone position not found", success: false });
      }
  
      zonePos.lat = lat;
      zonePos.lng = lng;
      await zonePos.save();
  
      return res.status(200).json({ message: "Zone position updated successfully", success: true });
    } catch (error) {
      console.error("Error updating zone position:", error);
      return res.status(500).json({ error: "Error updating zone position", success: false });
    }
  });
  
  // 📌 DELETE /api/zones/:zoneId → Delete a zone and its positions
  router.delete("/:zoneId", async (req, res) => {
    const { zoneId } = req.params;
  
    try {
      const zone = await Zone.findByPk(zoneId);
  
      if (!zone) {
        return res.status(404).json({ error: "Zone not found", success: false });
      }
  
      await zone.destroy(); // Cascade will delete ZonePos automatically
      return res.status(200).json({ message: "Zone deleted successfully", success: true });
    } catch (error) {
      console.error("Error deleting zone:", error);
      return res.status(500).json({ error: "Error deleting zone", success: false });
    }
  });

module.exports = router;
