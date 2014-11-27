'use strict';

//Setting up route
angular.module('contactpersoons').config(['$stateProvider',
	function($stateProvider) {
		// Contactpersoons state routing
		$stateProvider.
		state('listContactpersoons', {
			url: '/contactpersoons',
			templateUrl: 'modules/contactpersoons/views/list-contactpersoons.client.view.html'
		}).
		state('createContactpersoon', {
			url: '/contactpersoons/create',
			templateUrl: 'modules/contactpersoons/views/create-contactpersoon.client.view.html'
		}).
		state('viewContactpersoon', {
			url: '/contactpersoons/:contactpersoonId',
			templateUrl: 'modules/contactpersoons/views/view-contactpersoon.client.view.html'
		}).
		state('editContactpersoon', {
			url: '/contactpersoons/:contactpersoonId/edit',
			templateUrl: 'modules/contactpersoons/views/edit-contactpersoon.client.view.html'
		});
	}
]);