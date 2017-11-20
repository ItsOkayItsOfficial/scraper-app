/*
* Author: Alex P
* URL: www.itsokayitsofficial.io
*
* Project Name: Scraper App - Server JS
* Version: 1.0
* Date: 11/19/17
* URL: github.com/itsokayitsofficial/scraper-app
*/

// VARIABLES - Dependencies
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var ObjectId = require('mongojs').ObjectID;
var ScrapedData = require('./scrapedDataModel');

// INIT - Handlebars engine
var hbs = exphbs.create({
  defaultLayout: 'main',
  // Specify helpers which are only registered on this instance.
  helpers: {
    addOne: function(value, options){
      return parseInt(value) + 1;
    }
  }
});

// INIT - Express app
var app = express();

// EXPRESS - Handlebars init
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// DATABASE - Mongoose db connection
mongoose.connect('mongodb://localhost/scraper');
var db = mongoose.connection;


// LISTEN - Express app PORT
app.listen(3000, function() {
  console.log('App running on port 3000!');
});
