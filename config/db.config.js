const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.PUBLIC_IP,
  dialect: "mysql",
  logging: (msg) => console.log(`[SEQUELIZE] ${msg}`)
});

module.exports = sequelize;