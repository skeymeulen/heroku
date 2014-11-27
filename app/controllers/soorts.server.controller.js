'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Soort = mongoose.model('Soort'),
	_ = require('lodash');

/**
 * Create a Soort
 */
exports.create = function(req, res) {
	var soort = new Soort(req.body);
	soort.user = req.user;

	soort.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(soort);
		}
	});
};

/**
 * Show the current Soort
 */
exports.read = function(req, res) {
	res.jsonp(req.soort);
};

/**
 * Update a Soort
 */
exports.update = function(req, res) {
	var soort = req.soort ;

	soort = _.extend(soort , req.body);

	soort.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(soort);
		}
	});
};

/**
 * Delete an Soort
 */
exports.delete = function(req, res) {
	var soort = req.soort ;

	soort.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(soort);
		}
	});
};

/**
 * List of Soorts
 */
exports.list = function(req, res) { Soort.find().sort('-created').populate('user', 'displayName').exec(function(err, soorts) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(soorts);
		}
	});
};

/**
 * Soort middleware
 */
exports.soortByID = function(req, res, next, id) { 
	Soort.findById(id).populate('user', 'displayName').exec(function(err, soort) {
		if (err) return next(err);
		if (! soort) return next(new Error('Failed to load Soort ' + id));
		req.soort = soort ;
		next();
	});
};

/**
 * Soort authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.soort.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
