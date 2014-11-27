'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var inschrijvings = require('../../app/controllers/inschrijvings');

	// Inschrijvings Routes
	app.route('/inschrijvings')
		.get(inschrijvings.list)
		.post(users.requiresLogin, inschrijvings.create);

	app.route('/inschrijvings/:inschrijvingId')
		.get(inschrijvings.read)
		.put(users.requiresLogin, inschrijvings.update)
		.delete(users.requiresLogin, inschrijvings.delete);

	// Finish by binding the Inschrijving middleware
	app.param('inschrijvingId', inschrijvings.inschrijvingByID);
};