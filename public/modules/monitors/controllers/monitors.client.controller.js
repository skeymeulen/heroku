'use strict';

// Monitors controller
angular.module('monitors').controller('MonitorsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Monitors',
	function($scope, $stateParams, $location, Authentication, Monitors ) {
		$scope.authentication = Authentication;

		// Create new Monitor
		$scope.create = function() {
			// Create new Monitor object
			var monitor = new Monitors ({
				voornaam: this.voornaam,
				familienaam: this.familienaam,
				rijksregisternummer: this.rijksregisternummer,
				geboortedatum: this.geboortedatum,
				adres: {
					straat: this.adres.straat,
					nummer: this.adres.nummer,
					postcode: this.adres.postcode,
					gemeente: this.adres.gemeente
				},
				telefoonnummer: this.telefoonnummer,
				email: this.email
			});

			// Redirect after save
			monitor.$save(function(response) {
				$location.path('monitors/' + response._id);

				// Clear form fields
				$scope.voornaam = '';
				$scope.familienaam = '';
				$scope.rijksregisternummer = '';
				$scope.geboortedatum = '';
				$scope.adres = '';
				$scope.telefoonnummer = '';
				$scope.email = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Monitor
		$scope.remove = function( monitor ) {
			if ( monitor ) { monitor.$remove();

				for (var i in $scope.monitors ) {
					if ($scope.monitors [i] === monitor ) {
						$scope.monitors.splice(i, 1);
					}
				}
			} else {
				$scope.monitor.$remove(function() {
					$location.path('monitors');
				});
			}
		};

		// Update existing Monitor
		$scope.update = function() {
			var monitor = $scope.monitor ;

			monitor.$update(function() {
				$location.path('monitors/' + monitor._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Monitors
		$scope.find = function() {
			$scope.monitors = Monitors.query();
		};

		// Find existing Monitor
		$scope.findOne = function() {
			$scope.monitor = Monitors.get({ 
				monitorId: $stateParams.monitorId
			});
		};
	}
]);