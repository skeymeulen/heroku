'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Blog Schema
 */
var BlogSchema = new Schema({
		posts: [{
			titel: { type: String},
			body: { type: String},
			tijdstip: { type: Date},
			auteur: {type: String}
		}]
	});

mongoose.model('Blog', BlogSchema);