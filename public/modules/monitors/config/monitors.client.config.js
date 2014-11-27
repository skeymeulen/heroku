'use strict';

// Configuring the Articles module
angular.module('monitors').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Monitors', 'monitors', 'dropdown', '/monitors(/create)?');
		Menus.addSubMenuItem('topbar', 'monitors', 'List Monitors', 'monitors');
		Menus.addSubMenuItem('topbar', 'monitors', 'New Monitor', 'monitors/create');
	}
]);