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
  tokenId: Sequelize.STRING,
  gId: {
    type: Sequelize.INTEGER,
    unique: true
  },
  lang: Sequelize.STRING

});

const Playlist = sequelize.define('playlist', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  status: {
    type: Sequelize.ENUM('purchased', 'forSale', 'none'),
    defaultValue: 'none'
  },
  origin_id: {type: Sequelize.STRING,
              unique: true},
  owner_id: Sequelize.INTEGER,
  playlist_name: Sequelize.STRING,
  videos: Sequelize.TEXT,
});
const Forsale = sequelize.define('forSale', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  pl_id: Sequelize.INTEGER
});
const Order = sequelize.define("orders", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: Sequelize.INTEGER,
  playlistId: Sequelize.INTEGER,
  orderIp: Sequelize.INTEGER(15)
});

User.sync();
Playlist.sync();
Order.sync();
module.exports = {
  User,
  Playlist,
  Order,
  Forsale
};
