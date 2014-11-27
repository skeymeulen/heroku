'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var monitoractiviteits = require('../../app/controllers/monitoractiviteits');

	// Monitoractiviteits Routes
	app.route('/monitoractiviteiten')
		.get(monitoractiviteits.list)
		.post(users.requiresLogin, monitoractiviteits.create);

	app.route('/monitoractiviteiten/:monitoractiviteitId')
		.get(monitoractiviteits.read)
		.put(monitoractiviteits.update)
		.delete(users.requiresLogin, monitoractiviteits.delete);

	// Finish by binding the Monitoractiviteit middleware
	app.param('monitoractiviteitId', monitoractiviteits.monitoractiviteitByID);
};