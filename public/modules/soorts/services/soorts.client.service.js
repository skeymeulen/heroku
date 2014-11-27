'use strict';

//Soorts service used to communicate Soorts REST endpoints
angular.module('soorts').factory('Soorts', ['$resource',
	function($resource) {
		return $resource('soorts/:soortId', { soortId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);