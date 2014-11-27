'use strict';

//Vakanties service used to communicate Vakanties REST endpoints
angular.module('vakanties').factory('Vakanties', ['$resource',
	function($resource) {
		return $resource('vakanties/:vakantieId', { vakantieId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);