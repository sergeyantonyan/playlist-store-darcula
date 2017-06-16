'use strict';
var rout = require("./router");
const http  = require('http');
const Koa = require('koa');
const render = require('koa-ejs');
const serve = require('koa-static');

let app = new Koa();
let path = require('path');
let dirName = __dirname;

dirName = dirName.replace("app","");

app.use(serve('.'));

render(app, {
    root: path.join(dirName, 'view'),
    layout: 'template',
    viewExt: 'html',
    cache: false,
    debug: true
});
app.use(rout.routes());

app.use(serve(__dirname + '/assets'));

module.exports = app;


