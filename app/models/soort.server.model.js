'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Soort Schema
 */
var SoortSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Soort naam is verplicht',
		trim: true
	}
});

mongoose.model('Soort', SoortSchema);