'use strict';

// Configuring the Articles module
angular.module('vakanties').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Vakanties', 'vakanties', 'dropdown', '/vakanties(/create)?');
		Menus.addSubMenuItem('topbar', 'vakanties', 'Overzicht vakanties', 'vakanties');
		Menus.addSubMenuItem('topbar', 'vakanties', 'Nieuwe vakantie', 'vakanties/create');
	}
]);