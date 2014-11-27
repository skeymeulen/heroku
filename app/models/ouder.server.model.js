'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Ouder Schema
 */
var OuderSchema = new Schema({
	rijksregisternummer: {
		type: String,
		default: '',
		required: 'Vul het rijksregisternummer in',
		trim: true
	},
	geboortedatum: {
		type: Date,
		default: Date.now,
		required: 'Vul de geboortedatum in',
	},
	adres: {
		straat: {
			type: String,
			default: '',
			required: 'Vul de straat in',
			trim: true
		},
		nummer: {
			type: String,
			default: '',
			required: 'Vul het huisnummer in',
			trim: true
		},
		bus: {
			type: String,
			default: '',
			trim: true
		},
		gemeente: {
			type: String,
			default: '',
			required: 'Vul de gemeente in',
			trim: true
		},
		postcode: {
			type: String,
			default: '',
			required: 'Vul de postcode in',
			trim: true
		}
	},
	telefoonnummer: {
			type: String,
			default: '',
			required: 'Vul de een telefoonnummer in',
			trim: true
	},
	kinderen: [{ type: String }]
});

mongoose.model('Ouder', OuderSchema);