'use strict';

// Configuring the Articles module
angular.module('soorts').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Soorts', 'soorts', 'dropdown', '/soorts(/create)?');
		Menus.addSubMenuItem('topbar', 'soorts', 'List Soorts', 'soorts');
		Menus.addSubMenuItem('topbar', 'soorts', 'New Soort', 'soorts/create');
	}
]);