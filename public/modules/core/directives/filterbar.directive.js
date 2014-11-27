'use strict';

var app = angular.module('core');

app.directive('filterbar', function() {
	return {
		restrict: 'E',
		template: '<div class="col-md-8 col-md-offset-2">' +
			'<div class="input-group searchbar">' +
			'<input type="text" class="form-control">' +
			'<span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span>' +
			'</div>' +
			'</div>'
	};
});