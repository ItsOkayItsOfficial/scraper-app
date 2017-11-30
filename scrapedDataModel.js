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
const mongoose = require('mongoose')
	, Schema = mongoose.Schema;

// SCHEMA - Scrapped data
const ScrapedDataSchema = Schema({
	title: {
		type: String,
		required: true,
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
const ScrapedData = mongoose.model('ScrapedData', ScrapedDataSchema);

// EXPORT - For import
module.exports = ScrapedData;