'use strict';

const Router = require('koa-router');

const passport = require('./auth');
const config = require('../config/config');
const pay = require('./payments');
const YoutubeAPI = require('./youtube.js');
const queries = require("./database/queries.js");
const {User, Playlist, Order, Forsale} = require("./database/models.js");

let router = new Router();

router.get('/', async function (ctx) {
  await ctx.render("main", {isAuth: ctx.isAuthenticated()});
});

router.get('/user-config', async function (ctx) {
  if (typeof(ctx.state.user) === "undefined") {
    await ctx.render("user-config", {
      name: [],
      img: [],
      isAuth: ctx.isAuthenticated()
    });
    return;
  }
  let users = await queries.getUser(ctx.state.user.id)
  await ctx.render("user-config", {
    name: users.get("displayName"),
    img: users.get("img"),
    isAuth: ctx.isAuthenticated()
  });

});

router.get("/userConfig", async function (ctx) {
  if (ctx.request.query["ilpId"]) {
    await User.update(
      {
        ilpId: ctx.request.query["ilpId"],
        ilpPass: ctx.request.query["ilpPass"]
      },
      {
        where: {
          id: ctx.state.user.id
        }
      });
  }
});

router.get('/dashboard', async function (ctx) {
  if (typeof(ctx.state.user) === "undefined") {
    await ctx.render("list", {playlists: [], forSale: [], isAuth: false});
    return;
  }
  let myPlaylists = await queries.getMyPlaylists(ctx.state.user.id);
  let imported = await queries.findImported(ctx.state.user.id);


  let forSale = await queries.findForSale(ctx.state.user.id);

  await ctx.render("list", {
    playlists: myPlaylists,
    imported: imported,
    forSale: forSale,
    isAuth: ctx.isAuthenticated()
  });
});

router.get('/sync', async function (ctx) {
  let yapi = new YoutubeAPI(config.google.clientID, config.google.clientSecret, config.google.callbackURL, ctx.state.user.accessToken, ctx.state.user.refresh_token);
  const playlists = await yapi.getPlaylists();

  for (let i = 0; i < playlists.items.length; i++) {
    await Playlist.upsert({
      yId: playlists.items[i].id,
      userId: ctx.state.user.id,
      name: playlists.items[i].snippet.title
    });
  }

  await ctx.render("sync", {});
});

router.get('/import', async function (ctx) {
  let yapi = new YoutubeAPI(config.google.clientID, config.google.clientSecret, config.google.callbackURL, ctx.state.user.accessToken, ctx.state.user.refresh_token);

  let playlist = queries.findOnePlaylist();

  const playlistItems = await yapi.getPlaylistItems(playlist.yId);

  let videos = '';
  for (let i = 0; i < playlistItems.items.length; i++) {
    videos += playlistItems.items[i].contentDetails.videoId + ";";
  }

  await Playlist.update(
    {
      videos: videos,
      status: "forSale"
    },
    {
      where: {
        id: ctx.request.query['playlistId']
      }
    });

  await Forsale.upsert({
    playlistId: ctx.request.query['playlistId']
  })
  await router.route("/list");
});

router.get('/buy', async function (ctx) {
  const playlistId = parseInt(ctx.request.query['playlistId']);

  let myPlaylist = await Playlist.findOne({
    where: {
      id: playlistId
    }
  });

  let sellerUser = await User.findById(myPlaylist.get('userId'));

  await pay(
    ctx.state.user.get('ilpId'),
    ctx.state.user.get('ilpPass'),
    sellerUser.get('ilpId'),
    1,
    'Payment for youtube playlist: ' + myPlaylist.get('name')
  );

  await Order.create({
    playlistId: playlistId,
    userId: ctx.state.user.id,
    orderIp: ctx.ip
  });

  let yapi = new YoutubeAPI(
    config.google.clientID,
    config.google.clientSecret,
    config.google.callbackURL,
    ctx.state.user.accessToken,
    ctx.state.user.refresh_token);

  const newPlaylist = await yapi.insertPlaylist(myPlaylist.name);
  let videos = myPlaylist.videos.split(";");
  videos.pop();
  for (let i = 0; i < videos.length; i++) {
    let insertVideo = await yapi.insertVideo(newPlaylist.id, videos[i]);
  }

  await Playlist.create({
    yId: newPlaylist.id,
    userId: ctx.state.user.id,
    name: myPlaylist.name,
    videos: myPlaylist.videos,
    originId: myPlaylist.id,
    status: "purchased"
  });
});

router.get('/payment', async function (ctx) {
  await ctx.render("payment", {});
});

router.get('/logout', function (ctx) {
  ctx.logout();
  ctx.redirect('/');
});

router.get('/auth/google',
  passport.authenticate('google', {
    scope: config.google.scope,
    accessType: config.google.accessType,
    approvalPrompt: config.google.approvalPrompt
  })
);

router.get('/oauth2callback',
  passport.authenticate('google', {
    successRedirect: '/sync',
    failureRedirect: '/'
  }));

module.exports = router;
