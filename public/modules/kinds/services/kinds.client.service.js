'use strict';

//Kinds service used to communicate Kinds REST endpoints
angular.module('kinds')
	.factory('Kinds', ['$resource',
	function($resource) {
		return $resource('kinds/:kindId', { kindId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
/*
angular.module('kinds').factory('AlleKinderen',{
	function($resource) {
		return $resource('kinds', {
			find: {
				method: 'GET'
			}
		});
	}
});*/