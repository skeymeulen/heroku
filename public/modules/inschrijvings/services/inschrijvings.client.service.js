'use strict';

//Inschrijvings service used to communicate Inschrijvings REST endpoints
angular.module('inschrijvings').factory('Inschrijvings', ['$resource',
	function($resource) {
		return $resource('inschrijvings/:inschrijvingId', { inschrijvingId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);