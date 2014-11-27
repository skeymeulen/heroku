'use strict';

// Configuring the Articles module
angular.module('kinds').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Kinds', 'kinds', 'dropdown', '/kinds(/create)?');
		Menus.addSubMenuItem('topbar', 'kinds', 'List Kinds', 'kinds');
		Menus.addSubMenuItem('topbar', 'kinds', 'New Kind', 'kinds/create');
	}
]);