'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Monitoractiviteit = mongoose.model('Monitoractiviteit'),
	_ = require('lodash');

/**
 * Create a Monitoractiviteit
 */
exports.create = function(req, res) {
	var monitoractiviteit = new Monitoractiviteit(req.body);
	monitoractiviteit.user = req.user;

	monitoractiviteit.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(monitoractiviteit);
		}
	});
};

/**
 * Show the current Monitoractiviteit
 */
exports.read = function(req, res) {
	res.jsonp(req.monitoractiviteit);
};

/**
 * Update a Monitoractiviteit
 */
exports.update = function(req, res) {
	var monitoractiviteit = req.monitoractiviteit ;

	monitoractiviteit = _.extend(monitoractiviteit , req.body);

	monitoractiviteit.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(monitoractiviteit);
		}
	});
};

/**
 * Delete an Monitoractiviteit
 */
exports.delete = function(req, res) {
	var monitoractiviteit = req.monitoractiviteit ;

	monitoractiviteit.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(monitoractiviteit);
		}
	});
};

/**
 * List of Monitoractiviteits
 */
exports.list = function(req, res) { Monitoractiviteit.find().sort('-created').populate('user', 'displayName').exec(function(err, monitoractiviteits) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(monitoractiviteits);
		}
	});
};

/**
 * Monitoractiviteit middleware
 */
exports.monitoractiviteitByID = function(req, res, next, id) { Monitoractiviteit.findById(id).populate('user', 'displayName').exec(function(err, monitoractiviteit) {
		if (err) return next(err);
		if (! monitoractiviteit) return next(new Error('Failed to load Monitoractiviteit ' + id));
		req.monitoractiviteit = monitoractiviteit ;
		next();
	});
};

/**
 * Monitoractiviteit authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.monitoractiviteit.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};