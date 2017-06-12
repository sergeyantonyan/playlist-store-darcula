'use strict'
const http  = require('http');
const Koa = require('koa');
const render = require('koa-ejs');
const Router =  require('koa-router');

var app = new Koa();
var router = new Router();
router.get('/page',async function(ctx) {
    ctx.body = '<h1>d</h1>';
});
app.use(router.routes());
app.listen(3000);