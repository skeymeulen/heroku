'use strict';

// Configuring the Contactpersoon module
angular.module('contactpersoons').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Contactpersonen', 'contactpersoons');
		/*Menus.addSubMenuItem('topbar', 'articles', 'List Articles', 'articles');
		Menus.addSubMenuItem('topbar', 'articles', 'New Article', 'articles/create');*/
	}
]);