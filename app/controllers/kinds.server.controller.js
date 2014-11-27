'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Kind = mongoose.model('Kind'),
	_ = require('lodash');

/**
 * Create a Kind
 */
exports.create = function(req, res) {
	var kind = new Kind(req.body);

	kind.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(kind);
		}
	});
};

/**
 * Show the current Kind
 */
exports.read = function(req, res) {
	res.jsonp(req.kind);
};

/**
 * Update a Kind
 */
exports.update = function(req, res) {
	var kind = req.kind ;

	kind = _.extend(kind , req.body);

	kind.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(kind);
		}
	});
};

/**
 * Delete an Kind
 */
exports.delete = function(req, res) {
	var kind = req.kind ;

	kind.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(kind);
		}
	});
};

/**
 * List of Kinds
 */
exports.list = function(req, res) { Kind.find().sort('-created').populate('user', 'displayName').exec(function(err, kinds) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(kinds);
		}
	});
};

/**
 * Kind middleware
 */
exports.kindByID = function(req, res, next, id) { Kind.findById(id).populate('user', 'displayName').exec(function(err, kind) {
		if (err) return next(err);
		if (! kind) return next(new Error('Failed to load Kind ' + id));
		req.kind = kind ;
		next();
	});
};

/**
 * Kind authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.kind.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};