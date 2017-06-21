'use strict';

const passport = require('koa-passport');
const config = require("./config/config.js")
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(async function(user, done) {
    done(null, user)
});

const GoogleStrategy = require('passport-google-auth').Strategy;
passport.use(new GoogleStrategy({
        clientId: config.google.clientID,
        clientSecret: config.google.clientSecret,
        callbackURL: 'http://localhost:' + (process.env.PORT || 3000) + '/auth/google/callback'
    },
    function(token, tokenSecret, profile, done) {
        // retrieve user ...
        fetchUser().then(user => done(null, user))
    }
));
