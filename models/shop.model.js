const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const Shop = sequelize.define("Shop", {
  shopId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  lat: { type: DataTypes.DECIMAL(10, 8), allowNull: false },
  lng: { type: DataTypes.DECIMAL(11, 8), allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  icon: { type: DataTypes.STRING, allowNull: true }
}, { timestamps: true });

module.exports = Shop;
