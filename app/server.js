'use strict';

const Koa = require('koa');
const render = require('koa-ejs');
const session = require('koa-session');
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');
const path = require('path');

let app = new Koa();

app.keys = ['some secret hurr'];

app.use(bodyParser());
app.use(session(app));

// authentication
const passport = require('./auth');
app.use(passport.initialize());
app.use(passport.session());

const router = require("./router");

app.use(serve(path.join(__dirname, '../assets')));

render(app, {
  root: path.join(__dirname, '../view'),
  layout: 'template',
  viewExt: 'html',
  cache: false,
  debug: true
});

app.use(router.routes());

// Require authentication for now
app.use(function (ctx, next) {
  if (ctx.isAuthenticated()) {
    return next()
  } else {
    ctx.redirect('/main')
  }
});

module.exports = app;
