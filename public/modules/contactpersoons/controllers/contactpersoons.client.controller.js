'use strict';

// Contactpersoons controller
angular.module('contactpersoons').controller('ContactpersoonsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Contactpersoons',
	function($scope, $stateParams, $location, Authentication, Contactpersoons ) {
		$scope.authentication = Authentication;

		// Create new Contactpersoon
		$scope.create = function() {
			// Create new Contactpersoon object
			var contactpersoon = new Contactpersoons ({
				voornaam: this.voornaam,
				familienaam: this.familienaam,
				telefoon: this.telefoon,
				email: this.email
			});

			// Redirect after save
			contactpersoon.$save(function(response) {
				$location.path('contactpersoons/' + response._id);

				// Clear form fields
				$scope.voornaam = '';
				$scope.familienaam = '';
				$scope.telefoon = '';
				$scope.email = '';

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.path = 'contactpersoon';

		// Remove existing Contactpersoon
		$scope.remove = function( contactpersoon ) {
			if ( contactpersoon ) { contactpersoon.$remove();

				for (var i in $scope.contactpersoons ) {
					if ($scope.contactpersoons [i] === contactpersoon ) {
						$scope.contactpersoons.splice(i, 1);
					}
				}
			} else {
				$scope.contactpersoon.$remove(function() {
					$location.path('contactpersoons');
				});
			}
		};

		// Update existing Contactpersoon
		$scope.update = function() {
			var contactpersoon = $scope.contactpersoon ;

			contactpersoon.$update(function() {
				$location.path('contactpersoons/' + contactpersoon._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Contactpersoons
		$scope.find = function() {
			$scope.contactpersoons = Contactpersoons.query();
		};

		// Find existing Contactpersoon
		$scope.findOne = function() {
			$scope.contactpersoon = Contactpersoons.get({ 
				contactpersoonId: $stateParams.contactpersoonId
			});
		};
	}
]);