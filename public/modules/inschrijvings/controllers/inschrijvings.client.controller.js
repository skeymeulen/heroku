'use strict';

// Inschrijvings controller
angular.module('inschrijvings').controller('InschrijvingsController', ['$scope', '$http', '$stateParams', '$location', 'Authentication', 'Inschrijvings', 'Kinds',
	function($scope, $http, $stateParams, $location, Authentication, Inschrijvings, Kinds ) {
		$scope.authentication = Authentication;
		$scope.vakantie = '';

		// Create new Inschrijving
		$scope.create = function() {
			// Create new Inschrijving object
			var inschrijving = new Inschrijvings ({
				kind: this.kind,
				vakantie: this.vakantie,
				betaald: this.betaald,
				contactpersoon: this.contactpersoon
			});

			$scope.vakantie = this.vakantie;
			//vakantie toevoegen aan kind
			var kinderen = Kinds.get({kindId:this.kind}, function(kind){
			  kind.vakanties.push($scope.vakantie);
				console.log(kinderen);
				/*TODO: Kan dit anders? */
				$http.put('http://localhost:3000/kinds/'+kind._id,kind);

			});


			var vakantieKnd = kinderen.vakanties;
			console.log(kinderen);
			
		
			// Redirect after save
			inschrijving.$save(function(response) {
				$location.path('inschrijvings/' + response._id);

				// Clear form fields
				$scope.kind = '';
				$scope.vakantie = '';
				$scope.betaald = '';
				$scope.contactpersoon = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Inschrijving
		$scope.remove = function( inschrijving ) {
			if ( inschrijving ) { inschrijving.$remove();

				for (var i in $scope.inschrijvings ) {
					if ($scope.inschrijvings [i] === inschrijving ) {
						$scope.inschrijvings.splice(i, 1);
					}
				}
			} else {
				$scope.inschrijving.$remove(function() {
					$location.path('inschrijvingen');
				});
			}
		};

		// Update existing Inschrijving
		$scope.update = function() {
			var inschrijving = $scope.inschrijving ;

			inschrijving.$update(function() {
				$location.path('inschrijvings/' + inschrijving._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Inschrijvings
		$scope.find = function() {
			$scope.inschrijvings = Inschrijvings.query();
		};

		// Find existing Inschrijving
		$scope.findOne = function() {
			$scope.inschrijving = Inschrijvings.get({ 
				inschrijvingId: $stateParams.inschrijvingId
			});
		};
	}
]);