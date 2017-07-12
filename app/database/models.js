'use strict';

const sequelize = require('./db.js');
const Sequelize = require("sequelize");

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  displayName: Sequelize.STRING,
  accessToken: Sequelize.STRING,
  refreshToken: Sequelize.STRING,
  idToken: Sequelize.STRING,
  ilpId: Sequelize.STRING,
  ilpPass: Sequelize.STRING,
  gId: {
    type: Sequelize.STRING,
    unique: true
  },
  lang: Sequelize.STRING,
  img: Sequelize.TEXT
});

const Playlist = sequelize.define('playlist', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: Sequelize.STRING,
  videos: Sequelize.TEXT,
  yId: {
    type: Sequelize.STRING,
    unique: true
  },
  originId: {
    type: Sequelize.INTEGER,
    unique: true
  },
  status: {
    type: Sequelize.ENUM('purchased', 'forSale', 'none'),
    defaultValue: 'none'
  },
});

const Forsale = sequelize.define('forSale', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
});

const Order = sequelize.define("orders", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  orderIP: Sequelize.INTEGER(15)
});

User.hasMany(Order, {foreignKey: 'userId'});
User.hasMany(Playlist, {foreignKey: 'userId'});

Playlist.hasOne(Forsale, {foreignKey: 'playlistId'});
Playlist.hasMany(Order, {foreignKey: 'playlistId', as: 'Order'});
Playlist.belongsTo(User, {foreignKey: 'userId'});

Forsale.belongsTo(Playlist, {foreignKey: 'playlistId'});

Order.belongsTo(User, {foreignKey: 'userId'});
Order.belongsTo(Playlist, {foreignKey: 'playlistId'});

User.sync();
Playlist.sync();
Forsale.sync();
Order.sync();

module.exports = {
  User,
  Playlist,
  Order,
  Forsale
};
