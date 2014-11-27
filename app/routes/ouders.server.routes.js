'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var ouders = require('../../app/controllers/ouders');

	// Ouders Routes
	app.route('/ouders')
		.get(ouders.list)
		.post(users.requiresLogin, ouders.create);

	app.route('/ouders/:ouderId')
		.get(ouders.read)
		.put(users.requiresLogin, ouders.update)
		.delete(users.requiresLogin, ouders.delete);

	// Finish by binding the Ouder middleware
	app.param('ouderId', ouders.ouderByID);
};