'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Kind Schema
 */
var KindSchema = new Schema({
	voornaam: {
		type: String,
		default: '',
		required: 'Vul de voornaam in',
		trim: true
	},
	familienaam: {
		type: String,
		default: '',
		required: 'Vul de familienaam in',
		trim: true
	},
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
	ouders: [{ type: String}],
	vakanties: [{ type: String }]
});

mongoose.model('Kind', KindSchema);