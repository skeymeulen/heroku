'use strict';

(function() {
	// Contactpersoons Controller Spec
	describe('Contactpersoons Controller Tests', function() {
		// Initialize global variables
		var ContactpersoonsController,
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

			// Initialize the Contactpersoons controller.
			ContactpersoonsController = $controller('ContactpersoonsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Contactpersoon object fetched from XHR', inject(function(Contactpersoons) {
			// Create sample Contactpersoon using the Contactpersoons service
			var sampleContactpersoon = new Contactpersoons({
				name: 'New Contactpersoon'
			});

			// Create a sample Contactpersoons array that includes the new Contactpersoon
			var sampleContactpersoons = [sampleContactpersoon];

			// Set GET response
			$httpBackend.expectGET('contactpersoons').respond(sampleContactpersoons);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.contactpersoons).toEqualData(sampleContactpersoons);
		}));

		it('$scope.findOne() should create an array with one Contactpersoon object fetched from XHR using a contactpersoonId URL parameter', inject(function(Contactpersoons) {
			// Define a sample Contactpersoon object
			var sampleContactpersoon = new Contactpersoons({
				name: 'New Contactpersoon'
			});

			// Set the URL parameter
			$stateParams.contactpersoonId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/contactpersoons\/([0-9a-fA-F]{24})$/).respond(sampleContactpersoon);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.contactpersoon).toEqualData(sampleContactpersoon);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Contactpersoons) {
			// Create a sample Contactpersoon object
			var sampleContactpersoonPostData = new Contactpersoons({
				name: 'New Contactpersoon'
			});

			// Create a sample Contactpersoon response
			var sampleContactpersoonResponse = new Contactpersoons({
				_id: '525cf20451979dea2c000001',
				name: 'New Contactpersoon'
			});

			// Fixture mock form input values
			scope.name = 'New Contactpersoon';

			// Set POST response
			$httpBackend.expectPOST('contactpersoons', sampleContactpersoonPostData).respond(sampleContactpersoonResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Contactpersoon was created
			expect($location.path()).toBe('/contactpersoons/' + sampleContactpersoonResponse._id);
		}));

		it('$scope.update() should update a valid Contactpersoon', inject(function(Contactpersoons) {
			// Define a sample Contactpersoon put data
			var sampleContactpersoonPutData = new Contactpersoons({
				_id: '525cf20451979dea2c000001',
				name: 'New Contactpersoon'
			});

			// Mock Contactpersoon in scope
			scope.contactpersoon = sampleContactpersoonPutData;

			// Set PUT response
			$httpBackend.expectPUT(/contactpersoons\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/contactpersoons/' + sampleContactpersoonPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid contactpersoonId and remove the Contactpersoon from the scope', inject(function(Contactpersoons) {
			// Create new Contactpersoon object
			var sampleContactpersoon = new Contactpersoons({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Contactpersoons array and include the Contactpersoon
			scope.contactpersoons = [sampleContactpersoon];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/contactpersoons\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleContactpersoon);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.contactpersoons.length).toBe(0);
		}));
	});
}());