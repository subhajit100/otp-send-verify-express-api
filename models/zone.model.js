const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const Zone = sequelize.define("Zone", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    allowNull: false
  }
}, {
  timestamps: false
});

module.exports = Zone;