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

// INIT - Handlebars engines
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

// EXPRESS - Handlebars & Bodyparse init
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static('public'));

// DATABASE - Mongoose db connection
mongoose.connect('mongodb://localhost/scraper');
const db = mongoose.connection;

// VARIABLE - Options for the URL to scrape
let options = {
  url: 'http://www.dailystar.com.lb/',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13'
  }
};

// REQUEST - Data from Options
request(options, function(error, response, html) {
  var $ = cheerio.load(html);
  // For each element with a "new-content-block" class
  $('div.new-content-block').each(function(i, element) {
    // Save the div and a tag
    var $a = $(this).children('a');
    var $div = $(this).children('div');
    // Save the article url
    var articleURL = $a.attr('href');
    // Save the img url of each element
    var imgURL = $a.children('img').attr('src');
    // Save the title text
    var title = $div.children('h4').text();
    // Save the synopsis text
    var synopsis = $div.children('p').text();
    // Create mongoose model
    var scrapedData = new ScrapedData({
      title: title,
      imgURL: imgURL,
      synopsis: synopsis,
      articleURL: articleURL
    });
    // Save data
    scrapedData.save(function(err) {
      if (err) {
        //console.log(err);
      }
      //console.log('Saved');
    });
  });
});

// GET - Send to front
app.get('/', function(req, res) {
  ScrapedData
    .findOne()
    .exec(function(err,data) {
      if (err) return console.error(err);
      res.render('index', {
        imgURL: data.imgURL,
        title: data.title,
        synopsis: data.synopsis,
        _id: data._id,
        articleURL: data.articleURL,
        comments: data.comments
      });
    })
});

// GET - Go forward
app.get('/next/:id', function(req, res) {
  ScrapedData
    .find({
      _id: {$gt: req.params.id}
    })
    .sort({_id: 1 })
    .limit(1)
    .exec(function(err,data) {
      if (err) return console.error(err);
      res.json(data);
    })
});

// GET - Go back
app.get('/prev/:id', function(req, res) {
  ScrapedData
    .find({
      _id: {$lt: req.params.id}
    })
    .sort({_id: -1 })
    .limit(1)
    .exec(function(err,data) {
      if (err) return console.error(err);
      res.json(data);
    })
});

// POST - Add data to db
app.post('/comment/:id', function(req, res) {
  ScrapedData.findByIdAndUpdate(
    req.params.id,
    {$push: {
      comments: {
        text: req.body.comment
      }
    }},
    {upsert: true, new: true},
    function(err, data) {
      if (err) return console.error(err);
      res.json(data.comments);
    }
  );
});

// POST - Remove data from db
app.post('/remove/:id', function(req, res) {
  ScrapedData.findByIdAndUpdate(
    req.params.id,
    {$pull: {
      comments: {
        _id: req.body.id
      }
    }},
    {new: true},
    function(err, data) {
      if (err) return console.error(err);
      res.json(data.comments);
    }
  );
});

// LISTEN - Express app PORT
app.listen(3000, function () {
  console.log('App running on port 3000!');
});