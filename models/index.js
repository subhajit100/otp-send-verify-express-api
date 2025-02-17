const sequelize = require("../config/db.config");
const User = require("./user.model");
const Category = require("./category.model");
const Shop = require("./shop.model");
const Place = require("./place.model");

const db = {
  sequelize,
  User,
  Category,
  Shop,
  Place
};

// Sync Models
sequelize.sync({ alter: true })
  .then(() => console.log("Database & tables synced"))
  .catch((err) => console.error("Error syncing database:", err));

module.exports = db;
