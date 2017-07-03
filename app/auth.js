'use strict';

const passport = require('koa-passport');
const config = require("../config/config.js");

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(async function (user, done) {
  done(null, user)
});

const GoogleStrategy = require('passport-google-auth').Strategy;
passport.use(new GoogleStrategy({
    clientId: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackURL
  },
  function (accessToken, refreshToken, profile, done) {

    const user = {
        name: profile.displayName,
        accessToken: accessToken,
        refreshToken: refreshToken,
        id: profile.id
    }

    done(null, user);
  }
));

module.exports = passport;