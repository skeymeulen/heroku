'use strict';

//Setting up route
angular.module('monitors').config(['$stateProvider',
	function($stateProvider) {
		// Monitors state routing
		$stateProvider.
		state('listMonitors', {
			url: '/monitors',
			templateUrl: 'modules/monitors/views/list-monitors.client.view.html'
		}).
		state('createMonitor', {
			url: '/monitors/create',
			templateUrl: 'modules/monitors/views/create-monitor.client.view.html'
		}).
		state('viewMonitor', {
			url: '/monitors/:monitorId',
			templateUrl: 'modules/monitors/views/view-monitor.client.view.html'
		}).
		state('editMonitor', {
			url: '/monitors/:monitorId/edit',
			templateUrl: 'modules/monitors/views/edit-monitor.client.view.html'
		});
	}
]);