const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const Zone = require("./zone.model"); // import the Zone model

const ZonePos = sequelize.define("ZonePos", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    allowNull: false
  },
  lat: {
    type: DataTypes.DECIMAL(10, 7),
    allowNull: false
  },
  lng: {
    type: DataTypes.DECIMAL(10, 7),
    allowNull: false
  },
  zoneId: {
    type: DataTypes.BIGINT,
    references: {
      model: Zone,
      key: "id"
    },
    onDelete: "CASCADE"
  }
}, {
  timestamps: false
});

// Define the association
Zone.hasMany(ZonePos, { foreignKey: "zoneId", as: "ZonePositions", onDelete: "CASCADE" });
ZonePos.belongsTo(Zone, { foreignKey: "zoneId", onDelete: "CASCADE" });

module.exports = ZonePos;
