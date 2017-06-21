'use strict';

const passport = require('koa-passport');
const config = require("../config/config.js")
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
  function (token, tokenSecret, profile, done) {
    console.log(profile.displayName);
    done(null, profile);
  }
));

module.exports = passport;