'use strict';

// Configuring the Articles module
angular.module('ouders').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Ouders', 'ouders', 'dropdown', '/ouders(/create)?');
		Menus.addSubMenuItem('topbar', 'ouders', 'List Ouders', 'ouders');
		Menus.addSubMenuItem('topbar', 'ouders', 'New Ouder', 'ouders/create');
	}
]);