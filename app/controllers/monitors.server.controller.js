'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Monitor = mongoose.model('Monitor'),
	_ = require('lodash');

/**
 * Create a Monitor
 */
exports.create = function(req, res) {
	var monitor = new Monitor(req.body);
	monitor.user = req.user;

	monitor.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(monitor);
		}
	});
};

/**
 * Show the current Monitor
 */
exports.read = function(req, res) {
	res.jsonp(req.monitor);
};

/**
 * Update a Monitor
 */
exports.update = function(req, res) {
	var monitor = req.monitor ;

	monitor = _.extend(monitor , req.body);

	monitor.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(monitor);
		}
	});
};

/**
 * Delete an Monitor
 */
exports.delete = function(req, res) {
	var monitor = req.monitor ;

	monitor.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(monitor);
		}
	});
};

/**
 * List of Monitors
 */
exports.list = function(req, res) { Monitor.find().sort('-created').populate('user', 'displayName').exec(function(err, monitors) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(monitors);
		}
	});
};

/**
 * Monitor middleware
 */
exports.monitorByID = function(req, res, next, id) { Monitor.findById(id).populate('user', 'displayName').exec(function(err, monitor) {
		if (err) return next(err);
		if (! monitor) return next(new Error('Failed to load Monitor ' + id));
		req.monitor = monitor ;
		next();
	});
};

/**
 * Monitor authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.monitor.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};