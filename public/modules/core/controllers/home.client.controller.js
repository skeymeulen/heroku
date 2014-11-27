'use strict';


angular.module('core').controller('HomeController', ['$scope', '$location', 'Authentication',
	function($scope, $location, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		var menuItems = [
			'vakanties',
			'kinderen',
			'contactpersonen',
			'ouders',
			'monitors',
			'inschrijvingen',
			'monitoractiviteiten',
			'blogs',
			'soorten vakanties'
		];

		var getCreateBtnContent = function(selected){
			switch(selected){
				case'vakanties': $scope.createBtnContent = 'nieuwe vakantie';
				break;
				case'kinderen': $scope.createBtnContent = 'nieuw kind';
				break;
				case'contactpersonen': $scope.createBtnContent = 'nieuwe contactpersoon';
				break;
				case'ouders': $scope.createBtnContent = 'nieuwe ouder';
				break;
				case'monitors': $scope.createBtnContent = 'nieuwe monitor';
				break;
				case'inschrijvingen': $scope.createBtnContent = 'nieuwe inschrijving';
				break;
				case'monitoractiviteiten': $scope.createBtnContent = 'nieuwe activiteit';
				break;
				case'soorten vakanties': $scope.createBtnContent = 'nieuwe soort';
				break;
				case'blogs': $scope.createBtnContent = 'nieuwe blog';
				break;
			}
		}

		$scope.menuItems = menuItems;

		$scope.selectedTab = $location.path().substr(1);

		$scope.createLink = $location.path();

		getCreateBtnContent($scope.selectedTab);


		$scope.toggle = function(item){
			$scope.selectedTab = item;
			$scope.createLink = '/' + item;
			getCreateBtnContent($scope.selectedTab);
		};


	}
]);