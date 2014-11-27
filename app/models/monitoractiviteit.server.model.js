'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Monitoractiviteit Schema
 */
var MonitoractiviteitSchema = new Schema({
	naam: {
		type: String,
		default: '',
		required: 'Vul de activiteitnaam in',
		trim: true
	},
	isopleiding: {
		type: Boolean,
		default: false,
	},
	beschrijving: {
		type: String,
		default: '',
		required: 'Vul de beschrijving in',
		trim: true
	},
	locatie: {
		type: String,
		default: '',
		required: 'Vul de locatie in',
		trim: true
	},
	beginTijd: {
		type: Date,
		default: Date.now,
		required: 'Vul het begintijd in',
		trim: true
	},
	eindTijd: {
		type: Date,
		default: Date.now,
		required: 'Vul het eindtijd in',
		trim: true
	},
	monitoren: [{ type : String }],
	// HIER MOET NOG DOCUMENTUPLOAD KOMEN
});

mongoose.model('Monitoractiviteit', MonitoractiviteitSchema);