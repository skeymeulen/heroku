'use strict';

//Ouders service used to communicate Ouders REST endpoints
angular.module('ouders').factory('Ouders', ['$resource',
	function($resource) {
		return $resource('ouders/:ouderId', { ouderId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);