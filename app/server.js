'use strict';

const Koa = require('koa');
const render = require('koa-ejs');
const session = require('koa-session');
const serve = require('koa-static');
const path = require('path');

let app = new Koa();

app.keys = ['some secret hurr'];

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


// routes
/*

app.use(route.post('/custom', function(ctx, next) {
    return passport.authenticate('local', function(err, user, info, status) {
        if (user === false) {
            ctx.body = { success: false }
            ctx.throw(401)
        } else {
            ctx.body = { success: true }
            return ctx.login(user)
        }
    })(ctx, next)
}))
*/

/*
// POST /login
app.use(route.post('/login',
    passport.authenticate('local', {
        successRedirect: '/app',
        failureRedirect: '/'
    })
))
*/

app.use(router.routes());

// Require authentication for now
app.use(function(ctx, next) {
    if (ctx.isAuthenticated()) {
        return next()
    } else {
        ctx.redirect('/main')
    }
})

module.exports = app;