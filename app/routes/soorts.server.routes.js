'use strict';

module.exports = function(app) {

	var users = require('../../app/controllers/users');
	var soorts = require('../../app/controllers/soorts');

	// Soorts Routes
	app.route('/soorts')
		.get(soorts.list)
		.post(users.requiresLogin, soorts.create);

	app.route('/soorts/:soortId')
		.get(soorts.read)
		.put(users.requiresLogin, soorts.update)
		.delete(users.requiresLogin, soorts.delete);

	// Finish by binding the Soort middleware
	app.param('soortId', soorts.soortByID);
};
