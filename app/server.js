'use strict';

const http  = require('http');
const Koa = require('koa');
const render = require('koa-ejs');
const Router =  require('koa-router');

let app = new Koa();
let router = new Router();
let path = require('path');
let dirName = __dirname;

dirName = dirName.replace("app","");

render(app, {
    root: path.join(dirName, 'view'),
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
module.exports = app;