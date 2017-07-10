const Router = require('koa-router');
const passport = require('./auth');
const config = require('../config/config');
const Koa = require('koa');
const YoutubeAPI = require('./youtube.js');
var {User, Playlist, Order, Forsale} = require("./database/models.js");
let router = new Router();
let app = new Koa();

router.get('/', async function (ctx) {
  await ctx.render("main", {});

});

router.get('/home', async function (ctx) {
  await ctx.render("home", {});

});

router.get('/user-config', async function (ctx) {
  let users = await User.findOne({
    where: {
      id: ctx.state.user.id
    }
  });
  await ctx.render("user-config", {name: users.get("displayName"),img: users.get("img")});

});
router.get("/userConfig", async function(ctx){
  if(ctx.request.query["ilpId"]) {
    await User.update(
      {
        ilpId: ctx.request.query["ilpId"]
      },
      {
        where: {
          id: ctx.state.user.id
        }
      });
  }
});

router.get('/playlist', async function (ctx) {
  // const newPlaylist = await yapi.insertPlaylist(playlists.items[0].title, playlists.items[0].description);
  let myPlaylists = await Playlist.findAll({
    where: {
      userId: ctx.state.user.id,
      status: {
        $ne: "purchased"
      }
    }
  });

  let forSale = await Playlist.findAll({
    include: [{model: Forsale, required: true}],
    where: {
      userId: {
        $ne: ctx.state.user.id
      }
    }
  });

  await ctx.render("list", {playlists: myPlaylists, forSale: forSale});
});

router.get('/sync', async function (ctx) {
  let yapi = new YoutubeAPI(config.google.clientID, config.google.clientSecret, config.google.callbackURL, ctx.state.user.accessToken, ctx.state.user.refresh_token);
  const playlists = await yapi.getPlaylists();

  // const playlistItems = await yapi.getPlaylistItems("PLmbex5YB5ARvpMRtkpe0DSyoWNyQub0nT");

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

  let playlist = await Playlist.findOne({
    where: {
      id: ctx.request.query['playlistId']
    }
  });

  const playlistItems = await yapi.getPlaylistItems(playlist.yId);

  let videos = "";
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
  //await ctx.render("operations", {});
});

router.get('/buy', async function (ctx) {
  await Order.create({
    orderIp: 19216811
  });
  let myPlaylist = await Playlist.findOne({
    where: {
      id: ctx.request.query['playlistId']
    }
  });
  let yapi = new YoutubeAPI(config.google.clientID, config.google.clientSecret, config.google.callbackURL, ctx.state.user.accessToken, ctx.state.user.refresh_token);
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

  // await ctx.render("payment", {});
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
