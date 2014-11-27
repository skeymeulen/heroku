'use strict';

// Ouders controller
angular.module('ouders').controller('OudersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Ouders', 'Kinds',
	function($scope, $stateParams, $location, Authentication, Ouders, Kinds ) {
		$scope.authentication = Authentication;
		$scope.alleKinderen = Kinds.query();

		$scope.mijnKinderen = [];

		//kind toevoegen aan mijnKinderen
		$scope.voegKindToe = function(id){
			$scope.mijnKinderen[0] = id;
			console.log($scope.mijnKinderen);
		};

		// Create new Ouder
		$scope.create = function() {
			// Create new Ouder object
			var ouder = new Ouders ({
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
				kinderen: $scope.mijnKinderen
			});

			// Redirect after save
			ouder.$save(function(response) {
				$location.path('ouders/' + response._id);

				// Clear form fields
				$scope.voornaam = '';
				$scope.familienaam = '';
				$scope.rijksregisternummer = '';
				$scope.geboortedatum = '';
				$scope.telefoonnummer = '';

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Ouder
		$scope.remove = function( ouder ) {
			if ( ouder ) { ouder.$remove();

				for (var i in $scope.ouders ) {
					if ($scope.ouders [i] === ouder ) {
						$scope.ouders.splice(i, 1);
					}
				}
			} else {
				$scope.ouder.$remove(function() {
					$location.path('ouders');
				});
			}
		};

		// Update existing Ouder
		$scope.update = function() {
			var ouder = $scope.ouder ;

			ouder.$update(function() {
				$location.path('ouders/' + ouder._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Ouders
		$scope.find = function() {
			$scope.ouders = Ouders.query();
		};

		// Find existing Ouder
		$scope.findOne = function() {
			$scope.ouder = Ouders.get({ 
				ouderId: $stateParams.ouderId
			});
		};

	}
]);