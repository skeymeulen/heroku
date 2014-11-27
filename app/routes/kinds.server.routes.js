'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var kinds = require('../../app/controllers/kinds');

	// Kinds Routes
	app.route('/kinds')
		.get(kinds.list)
		.post(users.requiresLogin, kinds.create);

	app.route('/kinds/:kindId')
		.get(kinds.read)
		.put(users.requiresLogin, kinds.update)
		.delete(users.requiresLogin, kinds.delete);

	// Finish by binding the Kind middleware
	app.param('kindId', kinds.kindByID);
};