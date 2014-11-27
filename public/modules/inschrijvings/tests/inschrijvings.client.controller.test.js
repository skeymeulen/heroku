'use strict';

(function() {
	// Inschrijvings Controller Spec
	describe('Inschrijvings Controller Tests', function() {
		// Initialize global variables
		var InschrijvingsController,
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

			// Initialize the Inschrijvings controller.
			InschrijvingsController = $controller('InschrijvingsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Inschrijving object fetched from XHR', inject(function(Inschrijvings) {
			// Create sample Inschrijving using the Inschrijvings service
			var sampleInschrijving = new Inschrijvings({
				name: 'New Inschrijving'
			});

			// Create a sample Inschrijvings array that includes the new Inschrijving
			var sampleInschrijvings = [sampleInschrijving];

			// Set GET response
			$httpBackend.expectGET('inschrijvings').respond(sampleInschrijvings);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.inschrijvings).toEqualData(sampleInschrijvings);
		}));

		it('$scope.findOne() should create an array with one Inschrijving object fetched from XHR using a inschrijvingId URL parameter', inject(function(Inschrijvings) {
			// Define a sample Inschrijving object
			var sampleInschrijving = new Inschrijvings({
				name: 'New Inschrijving'
			});

			// Set the URL parameter
			$stateParams.inschrijvingId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/inschrijvings\/([0-9a-fA-F]{24})$/).respond(sampleInschrijving);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.inschrijving).toEqualData(sampleInschrijving);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Inschrijvings) {
			// Create a sample Inschrijving object
			var sampleInschrijvingPostData = new Inschrijvings({
				name: 'New Inschrijving'
			});

			// Create a sample Inschrijving response
			var sampleInschrijvingResponse = new Inschrijvings({
				_id: '525cf20451979dea2c000001',
				name: 'New Inschrijving'
			});

			// Fixture mock form input values
			scope.name = 'New Inschrijving';

			// Set POST response
			$httpBackend.expectPOST('inschrijvings', sampleInschrijvingPostData).respond(sampleInschrijvingResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Inschrijving was created
			expect($location.path()).toBe('/inschrijvings/' + sampleInschrijvingResponse._id);
		}));

		it('$scope.update() should update a valid Inschrijving', inject(function(Inschrijvings) {
			// Define a sample Inschrijving put data
			var sampleInschrijvingPutData = new Inschrijvings({
				_id: '525cf20451979dea2c000001',
				name: 'New Inschrijving'
			});

			// Mock Inschrijving in scope
			scope.inschrijving = sampleInschrijvingPutData;

			// Set PUT response
			$httpBackend.expectPUT(/inschrijvings\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/inschrijvings/' + sampleInschrijvingPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid inschrijvingId and remove the Inschrijving from the scope', inject(function(Inschrijvings) {
			// Create new Inschrijving object
			var sampleInschrijving = new Inschrijvings({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Inschrijvings array and include the Inschrijving
			scope.inschrijvings = [sampleInschrijving];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/inschrijvings\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleInschrijving);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.inschrijvings.length).toBe(0);
		}));
	});
}());