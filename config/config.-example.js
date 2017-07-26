'use strict';

const config = {
  port: 3000,
  koaSecret: 'Some very strong key goes here, yo!',
  google: {
    clientID: '',
    clientSecret: '',
    callbackURL: 'http://play.am:3000/auth/youtube/callback',
    accessType: 'offline',
    scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/youtube'],
    approvalPrompt: 'force'
  },
  db: {
    host: "Your hostname",
    database: "your database name",
    username: "Your username",
    password: "Your password"
  },
  ilp: 'Your ilp address'
};

module.exports = config;
