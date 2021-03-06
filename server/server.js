var express = require('express');
var app = express();
var mongoose = require('mongoose');

// reqire bodyparser middleware for dealing with POST requests
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));

mongoose.connect('mongodb://localhost:27017/photodrop');
var db = mongoose.connection;

require('./config/routes.js')(app, express);

app.listen(8000);
console.log('Starting server. Listening on 8000');

module.exports = {
  app: app,
  db: db
};