'use strict';

const passport = require('koa-passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require("../config/config.js");

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

    done(null, user);
  }
));

module.exports = passport;