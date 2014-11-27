'use strict';

var app = angular.module('core');

app.directive('createbutton', ['$location', function($location) {
	return {
		restrict: 'E',
		template: '<div class="col-md-2">' + 
			'<a class="btn btn-primary addBtn"' + 
			'ng-click="create()"' + 
			'role="button"' + 
			'ng-transclude>' +
			'</a>' + 
			'</div>',
		transclude: true,
		scope: {
			mapTo: '@'
		},
		link: function(scope, element, attrs){
			scope.create = function(){
				var newPath = attrs.mapTo + '/create';
				if(newPath.substring(0,1) == '/'){
					switch(newPath){
						case '/contactpersonen/create': newPath = 'contactpersoons/create';
						break;
						case '/kinderen/create': newPath = 'kinds/create';
						break;
						case '/inschrijvingen/create' : newPath = 'inschrijvings/create';
						break;
						case '/monitoractiviteiten/create' : newPath = 'monitoractiviteits/create';
						break;
						case '/soorten vakanties/create' : newPath = 'soorts/create';
						break;
					}
				}
				$location.path(newPath);
			};
		}
	};
}]);