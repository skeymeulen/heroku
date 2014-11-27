'use strict';

//Monitoractiviteits service used to communicate Monitoractiviteits REST endpoints
angular.module('monitoractiviteits').factory('Monitoractiviteits', ['$resource',
	function($resource) {
		return $resource('monitoractiviteits/:monitoractiviteitId', { monitoractiviteitId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);