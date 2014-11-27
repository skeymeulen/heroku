'use strict';

//Setting up route
angular.module('kinds').config(['$stateProvider',
	function($stateProvider) {
		// Kinds state routing
		$stateProvider.
		state('listKinds', {
			url: '/kinds',
			templateUrl: 'modules/kinds/views/list-kinds.client.view.html'
		}).
		state('createKind', {
			url: '/kinds/create',
			templateUrl: 'modules/kinds/views/create-kind.client.view.html'
		}).
		state('viewKind', {
			url: '/kinds/:kindId',
			templateUrl: 'modules/kinds/views/view-kind.client.view.html'
		}).
		state('editKind', {
			url: '/kinds/:kindId/edit',
			templateUrl: 'modules/kinds/views/edit-kind.client.view.html'
		});
	}
]);