'use strict';
var {User, Playlist, Order, Forsale} = require("./models.js")
console.log("---------------------------------")
console.log(Playlist.findAll({where:{
  owner_id: User.id
}}).then(palylist => {
  console.log(playlist)
}));
console.log("---------------------------------")

User.upsert({
  displayName: "Tsovakhd",
  accessToken: "xcvlxvl",
  refreshToken: "asp[kd",
  tokenId: "asdasxcv",
  gId: "110011",
  lang: "hy"
});