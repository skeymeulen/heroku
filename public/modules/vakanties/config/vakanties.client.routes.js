'use strict';

//Setting up route
angular.module('vakanties').config(['$stateProvider',
	function($stateProvider) {
		// Vakanties state routing
		$stateProvider.
		state('listVakanties', {
			url: '/vakanties',
			templateUrl: 'modules/vakanties/views/list-vakanties.client.view.html'
		}).
		state('createVakantie', {
			url: '/vakanties/create',
			templateUrl: 'modules/vakanties/views/create-vakantie.client.view.html'
		}).
		state('viewVakantie', {
			url: '/vakanties/:vakantieId',
			templateUrl: 'modules/vakanties/views/view-vakantie.client.view.html'
		}).
		state('editVakantie', {
			url: '/vakanties/:vakantieId/edit',
			templateUrl: 'modules/vakanties/views/edit-vakantie.client.view.html'
		});
	}
]);