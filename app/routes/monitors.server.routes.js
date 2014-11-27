'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var monitors = require('../../app/controllers/monitors');

	// Monitors Routes
	app.route('/monitors')
		.get(monitors.list)
		.post(users.requiresLogin, monitors.create);

	app.route('/monitors/:monitorId')
		.get(monitors.read)
		.put(users.requiresLogin, monitors.update)
		.delete(users.requiresLogin, monitors.delete);

	// Finish by binding the Monitor middleware
	app.param('monitorId', monitors.monitorByID);
};