'use strict';

//Setting up route
angular.module('monitoractiviteits').config(['$stateProvider',
	function($stateProvider) {
		// Monitoractiviteits state routing
		$stateProvider.
		state('listMonitoractiviteits', {
			url: '/monitoractiviteits',
			templateUrl: 'modules/monitoractiviteits/views/list-monitoractiviteits.client.view.html'
		}).
		state('createMonitoractiviteit', {
			url: '/monitoractiviteits/create',
			templateUrl: 'modules/monitoractiviteits/views/create-monitoractiviteit.client.view.html'
		}).
		state('viewMonitoractiviteit', {
			url: '/monitoractiviteits/:monitoractiviteitId',
			templateUrl: 'modules/monitoractiviteits/views/view-monitoractiviteit.client.view.html'
		}).
		state('editMonitoractiviteit', {
			url: '/monitoractiviteits/:monitoractiviteitId/edit',
			templateUrl: 'modules/monitoractiviteits/views/edit-monitoractiviteit.client.view.html'
		});
	}
]);