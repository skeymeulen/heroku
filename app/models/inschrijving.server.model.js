'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Inschrijving Schema
 */
var InschrijvingSchema = new Schema({
	
	kind: {
		type: String
	},
	vakantie: {
		type: String
	},
	betaald: {
		type: Boolean
	},
	contactpersoon: {
		type: String
	},
});

mongoose.model('Inschrijving', InschrijvingSchema);