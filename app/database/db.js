'use strict';

const Sequelize = require("sequelize");

const sequelize = new Sequelize('darcula', 'root', '', {
  host: 'localhost',
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
