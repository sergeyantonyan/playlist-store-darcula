'use strict';

const Koa = require('koa');
const render = require('koa-ejs');
const serve = require('koa-static');
const path = require('path');

let app = new Koa();

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

module.exports = app;
