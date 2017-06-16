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
router.get('/',async function(ctx) {
    await ctx.render("home", {});
});
router.get('/main',async function(ctx) {
    await ctx.render("main_page", {});
});
router.get('/create-playlist',async function(ctx) {
    await ctx.render("create_playlist", {});
});
router.get('/playlist',async function(ctx) {
    await ctx.render("list_page", {});
});
router.get('/payment',async function(ctx) {
    await ctx.render("payment_page", {});
});

app.use(router.routes());
module.exports = app;