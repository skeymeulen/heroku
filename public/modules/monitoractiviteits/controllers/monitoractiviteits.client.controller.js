'use strict';

// Monitoractiviteits controller
angular.module('monitoractiviteits').controller('MonitoractiviteitsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Monitoractiviteits',
	function($scope, $stateParams, $location, Authentication, Monitoractiviteits ) {
		$scope.authentication = Authentication;

		// Create new Monitoractiviteit
		$scope.create = function() {
			// Create new Monitoractiviteit object
			var monitoractiviteit = new Monitoractiviteits ({
				naam: this.naam,
				isopleiding: this.isopleiding,
				beschrijving: this.beschrijving,
				locatie: this.locatie,
				beginTijd: this.beginTijd,
				eindTijd: this.eindTijd,
				monitoren: this.monitoren,
				documenten: this.documenten
			});

			// Redirect after save
			monitoractiviteit.$save(function(response) {
				$location.path('monitoractiviteits/' + response._id);

				// Clear form fields
				$scope.naam = '';
				$scope.isopleiding = '';
				$scope.beschrijving = '';
				$scope.locatie = '';
				$scope.beginTijd = '';
				$scope.eindTijd = '';
				$scope.monitoren = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Monitoractiviteit
		$scope.remove = function( monitoractiviteit ) {
			if ( monitoractiviteit ) { monitoractiviteit.$remove();

				for (var i in $scope.monitoractiviteits ) {
					if ($scope.monitoractiviteits [i] === monitoractiviteit ) {
						$scope.monitoractiviteits.splice(i, 1);
					}
				}
			} else {
				$scope.monitoractiviteit.$remove(function() {
					$location.path('monitoractiviteits');
				});
			}
		};

		// Update existing Monitoractiviteit
		$scope.update = function() {
			var monitoractiviteit = $scope.monitoractiviteit ;

			monitoractiviteit.$update(function() {
				$location.path('monitoractiviteits/' + monitoractiviteit._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Monitoractiviteits
		$scope.find = function() {
			$scope.monitoractiviteits = Monitoractiviteits.query();
		};

		// Find existing Monitoractiviteit
		$scope.findOne = function() {
			$scope.monitoractiviteit = Monitoractiviteits.get({ 
				monitoractiviteitId: $stateParams.monitoractiviteitId
			});
		};
	}
]);