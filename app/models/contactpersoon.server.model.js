'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Contactpersoon Schema
 */
var ContactpersoonSchema = new Schema({
	voornaam: {
		type: String,
		default: '',
		required: 'Voornaam is verplicht',
		trim: true
	},
	familienaam: {
		type: String,
		default: '',
		required: 'Familienaam is verplicht',
		trim: true
	},
	telefoon: {
		type: String,
		default: '',
		trim: true
	},
	email: {
		type: String,
		default: '',
		trim: true
	}
});

mongoose.model('Contactpersoon', ContactpersoonSchema);