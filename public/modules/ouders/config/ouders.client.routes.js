'use strict';

//Setting up route
angular.module('ouders').config(['$stateProvider',
	function($stateProvider) {
		// Ouders state routing
		$stateProvider.
		state('listOuders', {
			url: '/ouders',
			templateUrl: 'modules/ouders/views/list-ouders.client.view.html'
		}).
		state('createOuder', {
			url: '/ouders/create',
			templateUrl: 'modules/ouders/views/create-ouder.client.view.html'
		}).
		state('viewOuder', {
			url: '/ouders/:ouderId',
			templateUrl: 'modules/ouders/views/view-ouder.client.view.html'
		}).
		state('editOuder', {
			url: '/ouders/:ouderId/edit',
			templateUrl: 'modules/ouders/views/edit-ouder.client.view.html'
		});
	}
]);