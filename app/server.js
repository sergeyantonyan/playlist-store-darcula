'use strict';
var rout = require("./router");

const http  = require('http');
const Koa = require('koa');
const render = require('koa-ejs');

let app = new Koa();
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

app.use(rout.routes());
module.exports = app;