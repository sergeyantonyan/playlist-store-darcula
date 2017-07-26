'use strict';

const Sequelize = require("sequelize");
const config = require("../../config/config.js")
const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
  host: config.db.host,
  dialect: 'mysql'
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Database Connection Established');
  })
  .catch(err => {
    console.error('Database Connection Error', err);
  });

module.exports = sequelize;
