'use strict';

//Setting up route
angular.module('soorts').config(['$stateProvider',
	function($stateProvider) {
		// Soorts state routing
		$stateProvider.
		state('listSoorts', {
			url: '/soorts',
			templateUrl: 'modules/soorts/views/list-soorts.client.view.html'
		}).
		state('createSoort', {
			url: '/soorts/create',
			templateUrl: 'modules/soorts/views/create-soort.client.view.html'
		}).
		state('viewSoort', {
			url: '/soorts/:soortId',
			templateUrl: 'modules/soorts/views/view-soort.client.view.html'
		}).
		state('editSoort', {
			url: '/soorts/:soortId/edit',
			templateUrl: 'modules/soorts/views/edit-soort.client.view.html'
		});
	}
]);