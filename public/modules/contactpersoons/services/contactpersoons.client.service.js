'use strict';

//Contactpersoons service used to communicate Contactpersoons REST endpoints
angular.module('contactpersoons').factory('Contactpersoons', ['$resource',
	function($resource) {
		return $resource('contactpersoons/:contactpersoonId', { contactpersoonId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);