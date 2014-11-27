'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Vakantie = mongoose.model('Vakantie'),
	_ = require('lodash');

/**
 * Create a Vakantie
 */
exports.create = function(req, res) {
	var vakantie = new Vakantie(req.body);
	vakantie.user = req.user;

	vakantie.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(vakantie);
		}
	});
};

/**
 * Show the current Vakantie
 */
exports.read = function(req, res) {
	res.jsonp(req.vakantie);
};

/**
 * Update a Vakantie
 */
exports.update = function(req, res) {
	var vakantie = req.vakantie ;

	vakantie = _.extend(vakantie , req.body);

	vakantie.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(vakantie);
		}
	});
};

/**
 * Delete an Vakantie
 */
exports.delete = function(req, res) {
	var vakantie = req.vakantie ;

	vakantie.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(vakantie);
		}
	});
};

/**
 * List of Vakanties
 */
exports.list = function(req, res) { Vakantie.find().sort('-created').populate('user', 'displayName').exec(function(err, vakanties) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(vakanties);
		}
	});
};

/**
 * Vakantie middleware
 */
exports.vakantieByID = function(req, res, next, id) { Vakantie.findById(id).populate('user', 'displayName').exec(function(err, vakantie) {
		if (err) return next(err);
		if (! vakantie) return next(new Error('Failed to load Vakantie ' + id));
		req.vakantie = vakantie ;
		next();
	});
};

/**
 * Vakantie authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.vakantie.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};