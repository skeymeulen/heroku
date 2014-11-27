'use strict';



module.exports = function(app) {

	var users = require('../../app/controllers/users');
    var vakanties = require('../../app/controllers/vakanties');

	// Vakanties Routes
	app.route('/vakanties')
		.get(vakanties.list)
		//.post(users.requiresLogin, vakanties.create);
		.post(vakanties.create);

	app.route('/vakanties/:vakantieId')
		.get(vakanties.read)
		.put(users.requiresLogin,  vakanties.update)
		.delete(users.requiresLogin, vakanties.delete);

	// Finish by binding the Vakantie middleware
	app.param('vakantieId', vakanties.vakantieByID);
};