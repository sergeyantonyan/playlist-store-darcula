const Sequelize = require("sequelize");
const sequelize = new Sequelize('darcula', 'root', '', {
	host: 'localhost',
	dialect: 'mysql'
});
const Users = sequelize.define('user',{
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	displayName: Sequelize.STRING,
	mail: Sequelize.STRING,
	accessToken: Sequelize.STRING, 
	refreshToken: Sequelize.STRING,
	tokenId: Sequelize.STRING,
	gId: Sequelize.INTEGER,
	regIp: Sequelize.INTEGER(15)
});
const Playlist = sequelize.define('playlist',{
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	ownerId: Sequelize.INTEGER,
	playlistId: Sequelize.STRING,
	videos: Sequelize.STRING
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

sequelize
	.authenticate()
	.then(() => {
		Users.sync();
		Playlist.sync();
		Order.sync();
		console.log(sequelize);
	})
	.catch(err => {
	console.error('Database Connection Error', err);
	});
module.export = {
	users: Users,
	playlists: Playlist,
	orders: Order 
}
