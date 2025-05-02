const sequelize = require("../config/db.config");
const User = require("./user.model");
const Category = require("./category.model");
const Shop = require("./shop.model");
const Place = require("./place.model");
const Zone = require("./zone.model");
const ZonePos = require("./zonepos.model");

const db = {
  sequelize,
  User,
  Category,
  Shop,
  Place,
  Zone,
  ZonePos
};

// Sync Models
sequelize.sync({ alter: true })
  .then(() => console.log("Database & tables synced"))
  .catch((err) => console.error("Error syncing database:", err));

module.exports = db;
