const { Sequelize } = require("sequelize");

const { DB_PASSWORD, DB_USERNAME } = require("../constants");

const db = new Sequelize(`postgres://${DB_USERNAME}:${DB_PASSWORD}@localhost:5432/events`);

module.exports = db;
