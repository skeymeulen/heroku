'use strict';

// Kinds controller
angular.module('kinds').controller('KindsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Kinds',
	function($scope, $stateParams, $location, Authentication, Kinds ) {
		$scope.authentication = Authentication;

		// Create new Kind
		$scope.create = function() {
			// Create new Kind object
			var kind = new Kinds ({
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
				ouders: this.ouders = [],
				vakanties: this.vakanties = []
			});
			// Redirect after save
			kind.$save(function(response) {
				$location.path('kinds/' + response._id);

				// Clear form fields
				$scope.voornaam = '';
				$scope.familienaanaam= '';
				$scope.rijksregisternummer= '';
				$scope.geboortedatum= '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Kind
		$scope.remove = function( kind ) {
			if ( kind ) { kind.$remove();

				for (var i in $scope.kinds ) {
					if ($scope.kinds [i] === kind ) {
						$scope.kinds.splice(i, 1);
					}
				}
			} else {
				$scope.kind.$remove(function() {
					$location.path('kinds');
				});
			}
		};

		// Update existing Kind
		$scope.update = function() {
			var kind = $scope.kind ;

			kind.$update(function() {
				$location.path('kinds/' + kind._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Kinds
		$scope.find = function() {
			$scope.kinds = Kinds.query();
		};

		// Find existing Kind
		$scope.findOne = function() {
			$scope.kind = Kinds.get({
				kindId: $stateParams.kindId
			});
		};
	}
]);