'use strict';
const passport = require('koa-passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require("../config/config.js");
var {User, Playlist, Order, Forsale} = require("./database/models.js");

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(async function (user, done) {
  done(null, user)
});
passport.use(new GoogleStrategy({
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackURL
  },
  function (accessToken, refreshToken, params, profile, done) {
    const user = {
      name: profile.displayName,
      accessToken: accessToken,
      refreshToken: refreshToken,
      id: profile.id,
      idToken: params.id_token
    };
    User.upsert({
      displayName: profile.displayName,
      accessToken: accessToken,
      refreshToken: refreshToken,
      tokenId: params.id_token,
      gId: profile.id,
      lang: profile._json.language
    });
    done(null, user);
  }
));

module.exports = passport;