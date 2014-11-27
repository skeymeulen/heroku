'use strict';

(function() {
	// Ouders Controller Spec
	describe('Ouders Controller Tests', function() {
		// Initialize global variables
		var OudersController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Ouders controller.
			OudersController = $controller('OudersController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Ouder object fetched from XHR', inject(function(Ouders) {
			// Create sample Ouder using the Ouders service
			var sampleOuder = new Ouders({
				name: 'New Ouder'
			});

			// Create a sample Ouders array that includes the new Ouder
			var sampleOuders = [sampleOuder];

			// Set GET response
			$httpBackend.expectGET('ouders').respond(sampleOuders);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.ouders).toEqualData(sampleOuders);
		}));

		it('$scope.findOne() should create an array with one Ouder object fetched from XHR using a ouderId URL parameter', inject(function(Ouders) {
			// Define a sample Ouder object
			var sampleOuder = new Ouders({
				name: 'New Ouder'
			});

			// Set the URL parameter
			$stateParams.ouderId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/ouders\/([0-9a-fA-F]{24})$/).respond(sampleOuder);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.ouder).toEqualData(sampleOuder);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Ouders) {
			// Create a sample Ouder object
			var sampleOuderPostData = new Ouders({
				name: 'New Ouder'
			});

			// Create a sample Ouder response
			var sampleOuderResponse = new Ouders({
				_id: '525cf20451979dea2c000001',
				name: 'New Ouder'
			});

			// Fixture mock form input values
			scope.name = 'New Ouder';

			// Set POST response
			$httpBackend.expectPOST('ouders', sampleOuderPostData).respond(sampleOuderResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Ouder was created
			expect($location.path()).toBe('/ouders/' + sampleOuderResponse._id);
		}));

		it('$scope.update() should update a valid Ouder', inject(function(Ouders) {
			// Define a sample Ouder put data
			var sampleOuderPutData = new Ouders({
				_id: '525cf20451979dea2c000001',
				name: 'New Ouder'
			});

			// Mock Ouder in scope
			scope.ouder = sampleOuderPutData;

			// Set PUT response
			$httpBackend.expectPUT(/ouders\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/ouders/' + sampleOuderPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid ouderId and remove the Ouder from the scope', inject(function(Ouders) {
			// Create new Ouder object
			var sampleOuder = new Ouders({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Ouders array and include the Ouder
			scope.ouders = [sampleOuder];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/ouders\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleOuder);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.ouders.length).toBe(0);
		}));
	});
}());