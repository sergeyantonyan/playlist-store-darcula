'use strict';

const passport = require('koa-passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require("../config/config.js");
var {User, Playlist, Order, Forsale} = require("./database/models.js");

passport.serializeUser(function (user, done) {
  done(null, user.gId);
});

passport.deserializeUser(async function (gId, done) {
  let user = await User.findOne({
    where: {
      gid: gId
    }
  });

  done(null, user)
});

passport.use(new GoogleStrategy({
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackURL
  },
  async function (accessToken, refreshToken, params, profile, done) {
    let user = {
      displayName: profile.displayName,
      accessToken: accessToken,
      idToken: params.id_token,
      gId: profile.id,
      lang: profile._json.language,
      img: profile.photos[0].value
    };
    if (refreshToken) {
      user.refreshToken = refreshToken;
    }
    await User.upsert(user);
    done(null, user);
  }
));

module.exports = passport;
