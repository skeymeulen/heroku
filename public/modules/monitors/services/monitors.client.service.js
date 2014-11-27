'use strict';

//Monitors service used to communicate Monitors REST endpoints
angular.module('monitors').factory('Monitors', ['$resource',
	function($resource) {
		return $resource('monitors/:monitorId', { monitorId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);