'use strict';

// Vakanties controller
angular.module('vakanties').controller('VakantiesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Vakanties', 'Soorts', 'Blogs',
	function($scope, $stateParams, $location, Authentication, Vakanties, Soorts, Blogs ) {
	$scope.authentication = Authentication;
	$scope.alleSoorten = Soorts.query();

	$scope.kortingArray = [{
      id: 1,
      naam: 'Korting 1'
    }, {
      id: 2,
      naam: 'Korting 2'
    }, {
      id: 3,
      naam: 'Korting 3'
    }];

    $scope.keuzes = {
      kortingArray: []
    };

    $scope.add = function() {
      $scope.kortingArray.push({
        id: $scope.id,
        naam: $scope.naamKorting
      });
    };

		// selecteer gekozen kortingen
		$scope.create = function() {
			var gekozenKortingen = [];
			this.keuzes.kortingArray.forEach(function(entry) {
    			$scope.kortingArray.forEach(function(entry2) {
    				if(entry === entry2.id){
    				    gekozenKortingen.push(entry2);
    				}
    			});
			});

			var fotosArray = [];
			fotosArray.push($scope.foto1);
			fotosArray.push($scope.foto2);

			/*var blog = new Blogs ({
				posts: []
			});

			
			blog.$save(function(response) {
					
					console.log(response._id);
				}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});


			//var blogId = blog._id;
			//blog._id = createdBlip._id;  //NOTE: ID ACCESSED HERE
            var message = JSON.stringify(blog);
			console.log(message);
			console.log(blog);

			*/

			// Create new Vakantie object
			var vakantie = new Vakanties ({
				naam: this.naam,
				ondertitel: this.ondertitel,
				beschrijving: this.beschrijving,
				vertrek: this.vertrek,
				terugkomst: this.terugkomst,
				eigenVervoer: this.eigenVervoer,
				formule: this.formule,
				prijs: this.prijs,
				ledenPrijs: this.ledenPrijs,
				doelgroepVan: this.doelgroepVan,
				doelgroepTot: this.doelgroepTot,
				maxAantalDeelnemers: this.maxAantalDeelnemers,
				kortingen: gekozenKortingen,
				fotos: fotosArray,
				soort: this.selectedSoort,
				blog:''
			});

			// Redirect after save
			vakantie.$save(function(response) {

				$location.path('vakanties/' + response._id);

				// Clear form fields
				$scope.naam = '';
				$scope.ondertitel = '';
				$scope.beschrijving = '';
				$scope.vertrek = '';
				$scope.terugkomst = '';
				$scope.eigenVervoer = '';
				$scope.formule = '';
				$scope.prijs = '';
				$scope.ledenPrijs = '';
				$scope.doelgroepVan = '';
				$scope.doelgroepTot = '';
				$scope.maxAantalDeelnemers = '';
				$scope.soort = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Vakantie
		$scope.remove = function( vakantie ) {
			if ( vakantie ) { vakantie.$remove();

				for (var i in $scope.vakanties ) {
					if ($scope.vakanties [i] === vakantie ) {
						$scope.vakanties.splice(i, 1);
					}
				}
			} else {
				$scope.vakantie.$remove(function() {
					$location.path('vakanties');
				});
			}
		};

		// Update existing Vakantie
		$scope.update = function() {
			var vakantie = $scope.vakantie ;

			vakantie.$update(function() {
				$location.path('vakanties/' + vakantie._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Vakanties
		$scope.find = function() {
			$scope.vakanties = Vakanties.query();
		};

		// Find existing Vakantie
		$scope.findOne = function() {
			$scope.vakantie = Vakanties.get({ 
				vakantieId: $stateParams.vakantieId
			});
		};
	}
])

.directive('checkboxList', function() {
  return {
    restrict: 'A',
    replace: true,
    scope: {
      selection: '=',
      items: '=',
      value: '@',
      label: '@'
    },
    template: '<div ng-repeat="item in list">' +
      '<label>' +
      '<input type="checkbox" value="{{item.value}}" ng-checked="item.checked" ng-click="toggle($index)"/>' +
      '{{item.label}}' +
      '</label>' +
      '</div>',
    controller: ['$scope',
      function($scope) {

        $scope.toggle = function(index) {
          var item = $scope.list[index],
            i = $scope.selection.indexOf(item.value);
          item.checked = !item.checked;
          if (!item.checked && i > -1) {
            $scope.selection.splice(i, 1);
          } else if (item.checked && i < 0) {
            $scope.selection.push(item.value);
          }
        };

        $scope.$watch('items', function(value) {
          $scope.list = [];

          if (angular.isArray(value)) {
            angular.forEach(value, function(item) {
              $scope.list.push({
                value: item[$scope.value],
                label: item[$scope.label],
                checked: $scope.selection.indexOf(item[$scope.value]) > -1
              });
            });
          }
        }, true);

      }
    ]
  };
});

