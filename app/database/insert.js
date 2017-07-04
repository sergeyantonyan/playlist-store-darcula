const {User, Playlist, Order} = require("./models.js");

User.create({
	displayName : "tsovakh",
	mail 	    : "tsovakh@gmail.com",
	accessToken : "Acc Token",
	refreshToken: "Ref Token",
	tokenId		: "Token Id",
	gId			: "Google id",
	regIp		: "192.168.1.1"
}).then( (user) => {
	console.log('Created user:', user.get({plain : true}));
}).catch( (error) => {
	console.error('Error inserting user', error)
});
