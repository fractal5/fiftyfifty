var express = require('express');
var db = require('./config');
var app = express();

require('./lib/middleware.js')(app, express);

app.listen(8000);

module.exports = app;