'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Vakantie Schema
 */
var VakantieSchema = new Schema({
	naam: {
		type: String,
		default: '',
		required: 'Naam is verplicht',
		trim: true
	},
	ondertitel: {
		type: String,
		default: '',
		trim: true
	},
	beschrijving: {
		type: String,
		default: '',
		required: 'Beschrijving is verplicht',
		trim: true
	},
	vertrek: {
		type: Date,
		default: Date.now,
		required: 'Vertrekdatum is verplicht',
	},
	terugkomst: {
		type: Date,
		default: Date.now,
		required: 'Terugkomstdatum is verplicht',
	},
	eigenVervoer: {
		type: Boolean
	},
	formule: {
		type: String,
		default: '',
		required: 'Formule is verplicht',
		trim: true
	},
	prijs: {
		type: Number,
		min: 0,
		default: '',
		required: 'Prijs is verplicht',
		trim: true
	},
	ledenPrijs: {
		type: Number,
		min: 0,
		default: '',
		required: 'Ledenprijs is verplicht',
		trim: true
	},
	doelgroepVan: {
		type: Number,
		min: 0,
		default: '',
		required: 'Ondergrens doelgroep is verplicht',
		trim: true
	},
	doelgroepTot: {
		type: Number,
		min: 0,
		default: '',
		required: 'Bovengrens doelgroep is verplicht',
		trim: true
	},
	maxAantalDeelnemers: {
		type: Number,
		min: 0,
		default: '',
		required: 'Maximum aantal deelnemers is verplicht',
		trim: true
	},
	kortingen: {
		type: [{
     		id: Number,
     		naam: String
     	}]
	},
	fotos: {
		type: [String]
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	soort: { 
		type : String,
		min: 0,
		required: 'Soort vakantie is verplicht'
	},
	blog:{
		type : String
	}
});

mongoose.model('Vakantie', VakantieSchema);