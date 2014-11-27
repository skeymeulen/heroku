'use strict';

//Setting up route
angular.module('inschrijvings').config(['$stateProvider',
	function($stateProvider) {
		// Inschrijvings state routing
		$stateProvider.
		state('listInschrijvings', {
			url: '/inschrijvings',
			templateUrl: 'modules/inschrijvings/views/list-inschrijvings.client.view.html'
		}).
		state('createInschrijving', {
			url: '/inschrijvings/create',
			templateUrl: 'modules/inschrijvings/views/create-inschrijving.client.view.html'
		}).
		state('viewInschrijving', {
			url: '/inschrijvings/:inschrijvingId',
			templateUrl: 'modules/inschrijvings/views/view-inschrijving.client.view.html'
		}).
		state('editInschrijving', {
			url: '/inschrijvings/:inschrijvingId/edit',
			templateUrl: 'modules/inschrijvings/views/edit-inschrijving.client.view.html'
		});
	}
]);