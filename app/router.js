const Router =  require('koa-router');
const passport = require('./auth');
const config = require('../config/config');
const Koa = require('koa');
const YoutubeAPI = require('./youtube.js');

let router = new Router();
let app = new Koa();

router.get('/', async function(ctx) {
    await ctx.render("main", {});
});

router.get('/home', async function(ctx) {
    await ctx.render("home", {});
});

router.get('/create-playlist', async function(ctx) {
    await ctx.render("create_playlist", {});
});

router.get('/playlist', async function(ctx) {
    await ctx.render("list", {});

    var yapi = new YoutubeAPI(config.google.clientID, config.google.clientSecret, config.google.callbackURL, ctx.state.user.accessToken, ctx.state.user.refresh_token);
});

router.get('/payment', async function(ctx) {
    await ctx.render("payment", {});
});

router.get('/logout', function(ctx) {
    ctx.logout();
    ctx.redirect('/')
});

router.get('/auth/google',
    passport.authenticate('google', {scope: config.google.scope, accessType: config.google.accessType, approvalPrompt: 'force'})
);

router.get('/oauth2callback',
    passport.authenticate('google', {
        successRedirect: '/playlist',
        failureRedirect: '/'
}));

module.exports = router;
