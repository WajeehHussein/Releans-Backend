"use strict";
require("dotenv").config();
const POSTGRES_URI =
  process.env.NODE_ENV === "test" ? "sqlite:memory:" : process.env.DATABASE_URL;
const { Sequelize, DataTypes } = require("sequelize");
const users = require("./user");

let sequelizeOptions =
  process.env.NODE_ENV === "production"
    ? {
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
          native: true,
        },
      }
    : {};

let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);

const userTable = users(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  users: userTable,
};
