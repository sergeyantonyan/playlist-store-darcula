const Sequelize = require("Sequelize");
const sequelize = require("./db.js");
const users = sequelize.define('users', {
  id: {
  	type: Sequelize.INTEGER,
  	autoIncrement: true, 
  	primaryKey: true},
  displayname: Sequelize.STRING,
  mail: Sequelize.STRING,
  aToken: Sequelize.STRING,
  rToken: Sequelize.STRING,
  idToken: Sequelize.STRING
});
const playlist = Sequelize.define('playlist', {
  id: {  
  	type: Sequelize.INTEGER,
  	autoIncrement: true, 
  	primaryKey: true},
  status: {
	  type: Sequelize.ENUM('purchased','forSale','none'),
	  defaultValue: 'none'
  },
  origin_id: playlist_id,  
  owner_id: Sequelize.INTEGER,
  playlist_name: Sequelize.STRING,
  videos: Sequelize.TEXT,
});

const forsale = Sequelize.define('forSale', {
  id: {
  	type: Sequelize.INTEGER,
  	autoIncrement: true, 
  	primaryKey: true},
	pl_id: Sequelize.INTEGER
});



const order = Sequelize.define('order', {
	id: {
	  	type: Sequelize.INTEGER,
	  	autoIncrement: true, 
	  	primaryKey: true
	},
	user_id: Sequelize.INTEGER,
	playlist_id: Sequelize
});


users.sync();
playlist.sync();
order.sync();