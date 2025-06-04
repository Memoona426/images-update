const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: console.log, // Enable logging temporarily for debugging
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    dialectOptions: {
      ssl: false,
    },
  }
);

const connectToDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");
    return true;
  } catch (error) {
    console.error("Unable to connect to the database:", error.message);
    console.error("Please check:");
    console.error("1. PostgreSQL service is running");
    console.error("2. Database credentials are correct");
    console.error("3. Database exists");
    console.error("4. Port is not blocked");
    return false;
  }
};

module.exports = { sequelize, connectToDb };
