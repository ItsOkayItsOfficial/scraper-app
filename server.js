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
const path = require('path');
const request = require('request');
const cheerio = require('cheerio');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const ObjectId = require('mongojs').ObjectID;
const ScrapedData = require('./scrapedDataModel');

// INIT - Handlebars engines545
let hbs = exphbs.create({
  defaultLayout: 'main',
  // Specify helpers which are only registered on this instance.
  helpers: {
    addOne: function (value, options) {
      return parseInt(value) + 1;
    }
  }
});

// INIT - Express app
const app = express();

// EXPRESS - Handlebars init
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// DATABASE - Mongoose db connection
mongoose.connect('mongodb://localhost/scraper');
const db = mongoose.connection;


// LISTEN - Express app PORT
app.listen(3000, function () {
  console.log('App running on port 3000!');
});