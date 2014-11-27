'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Ouder = mongoose.model('Ouder'),
	_ = require('lodash');

/**
 * Create a Ouder
 */
exports.create = function(req, res) {
	var ouder = new Ouder(req.body);
	ouder.user = req.user;

	ouder.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(ouder);
		}
	});
};

/**
 * Show the current Ouder
 */
exports.read = function(req, res) {
	res.jsonp(req.ouder);
};

/**
 * Update a Ouder
 */
exports.update = function(req, res) {
	var ouder = req.ouder ;

	ouder = _.extend(ouder , req.body);

	ouder.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(ouder);
		}
	});
};

/**
 * Delete an Ouder
 */
exports.delete = function(req, res) {
	var ouder = req.ouder ;

	ouder.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(ouder);
		}
	});
};

/**
 * List of Ouders
 */
exports.list = function(req, res) { Ouder.find().sort('-created').populate('user', 'displayName').exec(function(err, ouders) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(ouders);
		}
	});
};

/**
 * Ouder middleware
 */
exports.ouderByID = function(req, res, next, id) { Ouder.findById(id).populate('user', 'displayName').exec(function(err, ouder) {
		if (err) return next(err);
		if (! ouder) return next(new Error('Failed to load Ouder ' + id));
		req.ouder = ouder ;
		next();
	});
};

/**
 * Ouder authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.ouder.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};