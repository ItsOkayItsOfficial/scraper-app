/*
* Author: Alex P
* URL: www.itsokayitsofficial.io
*
* Project Name: Scraper App - Model JS
* Version: 1.0
* Date: 11/19/17
* URL: github.com/itsokayitsofficial/scraper-app
*/


// REQUIRE - New mongoose schema
var mongoose = require('mongoose')
	, Schema = mongoose.Schema;

// SCHEMA - Scrapped data
var ScrapedDataSchema = Schema({
	title: {
		type: String,
		required: true,
		// REPEAT - Make sure is unique
		unique: true
	},
	imgURL: {
		type: String,
		required: true
	},
	synopsis: {
		type: String,
		required: true
	},
	articleURL: {
		type: String,
		required: true
	},
	comments: [{
		text: {
			type: String
		}
	}]
});

// MODEL - Schema to model variable
var ScrapedData = mongoose.model('ScrapedData', ScrapedDataSchema);

// EXPORT - For import
module.exports = ScrapedData;