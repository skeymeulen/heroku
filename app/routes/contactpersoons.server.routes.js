'use strict';

module.exports = function(app) {
	
	var users = require('../../app/controllers/users');
	var contactpersoons = require('../../app/controllers/contactpersoons');
	// Contactpersoons Routes
	app.route('/contactpersoons')
		.get(contactpersoons.list)
		.post(users.requiresLogin, contactpersoons.create);

	app.route('/contactpersoons/:contactpersoonId')
		.get(contactpersoons.read)
		.put(users.requiresLogin, contactpersoons.update) //hier stond nog : contactpersoons.hasAuthorization,
		.delete(users.requiresLogin, contactpersoons.delete); //hier stond nog : contactpersoons.hasAuthorization,

	// Finish by binding the Contactpersoon middleware
	app.param('contactpersoonId', contactpersoons.contactpersoonByID);
};