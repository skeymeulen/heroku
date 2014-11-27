'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider

		.state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		})

        .state('home.contactpersonen', {
            url: 'contactpersonen',
            //parent: home,
            templateUrl: 'modules/contactpersoons/views/list-contactpersoons.client.view.html'
        })

        .state('home.vakanties', {
        	url: 'vakanties',
        	templateUrl: 'modules/vakanties/views/list-vakanties.client.view.html'
        })

        .state('home.kinderen', {
        	url: 'kinderen',
        	templateUrl: 'modules/kinds/views/list-kinds.client.view.html'
        })
        .state('home.ouders', {
            url: 'ouders',
            templateUrl: 'modules/ouders/views/list-ouders.client.view.html'
        })

          .state('home.monitors', {
            url: 'monitors',
            templateUrl: 'modules/monitors/views/list-monitors.client.view.html'
        })

          .state('home.inschrijvingen', {
            url: 'inschrijvingen',
            templateUrl: 'modules/inschrijvings/views/list-inschrijvings.client.view.html'
        })

            .state('home.monitoractiviteiten', {
            url: 'monitoractiviteiten',
            templateUrl: 'modules/monitoractiviteits/views/list-monitoractiviteits.client.view.html'

        })

             .state('home.blogs', {
            url: 'blogs',
            templateUrl: 'modules/blogs/views/list-blogs.client.view.html'

        }) 

            .state('home.soorten vakanties', {
            url: 'soorten',
            templateUrl: 'modules/soorts/views/list-soorts.client.view.html'

        });
	}
]);