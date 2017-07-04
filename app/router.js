const Router = require('koa-router');
const passport = require('./auth');
const config = require('../config/config');
const Koa = require('koa');
const YoutubeAPI = require('./youtube.js');

let router = new Router();
let app = new Koa();

router.get('/', async function (ctx) {
  await ctx.render("main", {});
});

router.get('/home', async function (ctx) {
  await ctx.render("home", {});
});

router.get('/create-playlist', async function (ctx) {
  const newPlaylist = await yapi.insertPlaylist("plasp", "zsdkjhcsd");


  for (let i = 0; i < playlistItems.items.length; i++) {
    console.log(playlistItems.items[i].snippet.resourceId.videoId);
    let insertVideo = await yapi.insertVideo(newPlaylist.id, playlistItems.items[i].snippet.resourceId.videoId);
  }
  await ctx.render("create_playlist", {});
});

router.get('/playlist', async function (ctx) {
  var yapi = new YoutubeAPI(config.google.clientID, config.google.clientSecret, config.google.callbackURL, ctx.state.user.accessToken, ctx.state.user.refresh_token);
  const playlists = await yapi.getPlaylists();

  const playlistItems = await yapi.getPlaylistItems("PLmbex5YB5ARvpMRtkpe0DSyoWNyQub0nT");

  // const newPlaylist = await yapi.insertPlaylist(playlists.items[0].title, playlists.items[0].description);


  await ctx.render("list", {playlists: playlists.items, items: playlistItems.items});
});

router.get('/payment', async function (ctx) {
  await ctx.render("payment", {});
});

router.get('/logout', function (ctx) {
  ctx.logout();
  ctx.redirect('/')
});

router.get('/auth/google',
  passport.authenticate('google', {
    scope: config.google.scope,
    accessType: config.google.accessType,
    approvalPrompt: 'force'
  })
);

router.get('/oauth2callback',
  passport.authenticate('google', {
    successRedirect: '/playlist',
    failureRedirect: '/'
  }));

module.exports = router;
