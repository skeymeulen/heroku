'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Inschrijving = mongoose.model('Inschrijving'),
	_ = require('lodash');

/**
 * Create a Inschrijving
 */
exports.create = function(req, res) {
	var inschrijving = new Inschrijving(req.body);
	inschrijving.user = req.user;

	inschrijving.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(inschrijving);
		}
	});
};

/**
 * Show the current Inschrijving
 */
exports.read = function(req, res) {
	res.jsonp(req.inschrijving);
};

/**
 * Update a Inschrijving
 */
exports.update = function(req, res) {
	var inschrijving = req.inschrijving ;

	inschrijving = _.extend(inschrijving , req.body);

	inschrijving.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(inschrijving);
		}
	});
};

/**
 * Delete an Inschrijving
 */
exports.delete = function(req, res) {
	var inschrijving = req.inschrijving ;

	inschrijving.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(inschrijving);
		}
	});
};

/**
 * List of Inschrijvings
 */
exports.list = function(req, res) { Inschrijving.find().sort('-created').populate('user', 'displayName').exec(function(err, inschrijvings) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(inschrijvings);
		}
	});
};

/**
 * Inschrijving middleware
 */
exports.inschrijvingByID = function(req, res, next, id) { Inschrijving.findById(id).populate('user', 'displayName').exec(function(err, inschrijving) {
		if (err) return next(err);
		if (! inschrijving) return next(new Error('Failed to load Inschrijving ' + id));
		req.inschrijving = inschrijving ;
		next();
	});
};

/**
 * Inschrijving authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.inschrijving.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};