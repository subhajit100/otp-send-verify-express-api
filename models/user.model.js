const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const User = sequelize.define("User", {
    userId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    profileUrl: { type: DataTypes.STRING, allowNull: true, defaultValue: "" },
    name: { type: DataTypes.STRING, allowNull: true, defaultValue: "" },
    mobileNumber: { type: DataTypes.STRING, allowNull: false, unique: true },
    recordPoints: { type: DataTypes.INTEGER, defaultValue: 0 }
  }, { timestamps: true }); // Enable createdAt & updatedAt

module.exports = User;
