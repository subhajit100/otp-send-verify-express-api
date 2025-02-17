const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const Category = require("./category.model");

const Place = sequelize.define("Place", {
  place_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  lat: { type: DataTypes.DECIMAL(10, 8), allowNull: false },
  lng: { type: DataTypes.DECIMAL(11, 8), allowNull: false },
  icon: { type: DataTypes.STRING, allowNull: true },
  name: { type: DataTypes.STRING, allowNull: false }
}, { timestamps: true });

// Foreign Key
Place.belongsTo(Category, { foreignKey: "category_id", targetKey: "id" });

module.exports = Place;
