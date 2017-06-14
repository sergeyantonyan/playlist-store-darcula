'use strict'
const http  = require('http');
const Koa = require('koa');
const render = require('koa-ejs');
const Router =  require('koa-router');

var app = new Koa();
var router = new Router();
var path = require('path')
render(app, {
    root: path.join("C:/Users/Administrator/Desktop/playlist-store/", 'view'),
    layout: 'template',
    viewExt: 'html',
    cache: false,
    debug: true
});
router.get('/page',async function(ctx) {
    await ctx.render("main_page", {});
});
router.get('/home',async function(ctx) {
    await ctx.render("home", {});
});

app.use(router.routes());
app.listen(7777);