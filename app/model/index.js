const { DataTypes, Sequelize } = require("sequelize");
const { sequelize } = require("../config/db");

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.images = require("./images")(sequelize, DataTypes);

module.exports = db;
