'use strict';

// Soorts controller
angular.module('soorts').controller('SoortsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Soorts',
	function($scope, $stateParams, $location, Authentication, Soorts) {
		$scope.authentication = Authentication;

		// Create new Soort
		$scope.create = function() {
			// Create new Soort object
			var soort = new Soorts ({
				name: this.name
			});

			// Redirect after save
			soort.$save(function(response) {
				$location.path('soorts/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Soort
		$scope.remove = function(soort) {
			if ( soort ) { 
				soort.$remove();

				for (var i in $scope.soorts) {
					if ($scope.soorts [i] === soort) {
						$scope.soorts.splice(i, 1);
					}
				}
			} else {
				$scope.soort.$remove(function() {
					$location.path('soorts');
				});
			}
		};

		// Update existing Soort
		$scope.update = function() {
			var soort = $scope.soort;

			soort.$update(function() {
				$location.path('soorts/' + soort._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Soorts
		$scope.find = function() {
			$scope.soorts = Soorts.query();
		};

		// Find existing Soort
		$scope.findOne = function() {
			$scope.soort = Soorts.get({ 
				soortId: $stateParams.soortId
			});
		};
	}
]);