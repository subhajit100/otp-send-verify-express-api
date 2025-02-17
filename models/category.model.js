const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const Category = sequelize.define("Category", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  icon: { type: DataTypes.STRING, allowNull: false }
}, { timestamps: true });

module.exports = Category;
