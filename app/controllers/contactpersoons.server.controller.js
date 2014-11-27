'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Contactpersoon = mongoose.model('Contactpersoon'),
	_ = require('lodash');

/**
 * Create a Contactpersoon
 */
exports.create = function(req, res) {
	var contactpersoon = new Contactpersoon(req.body);
	contactpersoon.user = req.user;

	contactpersoon.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(contactpersoon);
		}
	});
};

/**
 * Show the current Contactpersoon
 */
exports.read = function(req, res) {
	res.jsonp(req.contactpersoon);
};

/**
 * Update a Contactpersoon
 */
exports.update = function(req, res) {
	var contactpersoon = req.contactpersoon ;

	contactpersoon = _.extend(contactpersoon , req.body);

	contactpersoon.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(contactpersoon);
		}
	});
};

/**
 * Delete an Contactpersoon
 */
exports.delete = function(req, res) {
	var contactpersoon = req.contactpersoon ;

	contactpersoon.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(contactpersoon);
		}
	});
};

/**
 * List of Contactpersoons
 */
exports.list = function(req, res) { Contactpersoon.find().sort('-created').populate('user', 'displayName').exec(function(err, contactpersoons) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(contactpersoons);
		}
	});
};

/**
 * Contactpersoon middleware
 */
exports.contactpersoonByID = function(req, res, next, id) { Contactpersoon.findById(id).populate('user', 'displayName').exec(function(err, contactpersoon) {
		if (err) return next(err);
		if (! contactpersoon) return next(new Error('Failed to load Contactpersoon ' + id));
		req.contactpersoon = contactpersoon ;
		next();
	});
};

/**
 * Contactpersoon authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.contactpersoon.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};