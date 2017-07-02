const db = require("./db.js");
console.log(db);
setTimeout(function(db){
	console.log(db);
	const ExRow = db["users"].build({
		displayName : "tsovakh",
		mail 	    : "tsovakh@gmail.com",
		accessToken : "Acc Token",
		refreshToken: "Ref Token",
		tokenId		: "Token Id",
		gId			: "Google id",
		regIp		: "192.168.1.1"
	});
	ExRow
		.save()
		.catch(error => {
			console.log("Error rejecting" + error);
		});
}, 3000, db);