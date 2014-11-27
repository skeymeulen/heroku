'use strict';

(function() {
	// Soorts Controller Spec
	describe('Soorts Controller Tests', function() {
		// Initialize global variables
		var SoortsController,
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

			// Initialize the Soorts controller.
			SoortsController = $controller('SoortsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Soort object fetched from XHR', inject(function(Soorts) {
			// Create sample Soort using the Soorts service
			var sampleSoort = new Soorts({
				name: 'New Soort'
			});

			// Create a sample Soorts array that includes the new Soort
			var sampleSoorts = [sampleSoort];

			// Set GET response
			$httpBackend.expectGET('soorts').respond(sampleSoorts);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.soorts).toEqualData(sampleSoorts);
		}));

		it('$scope.findOne() should create an array with one Soort object fetched from XHR using a soortId URL parameter', inject(function(Soorts) {
			// Define a sample Soort object
			var sampleSoort = new Soorts({
				name: 'New Soort'
			});

			// Set the URL parameter
			$stateParams.soortId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/soorts\/([0-9a-fA-F]{24})$/).respond(sampleSoort);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.soort).toEqualData(sampleSoort);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Soorts) {
			// Create a sample Soort object
			var sampleSoortPostData = new Soorts({
				name: 'New Soort'
			});

			// Create a sample Soort response
			var sampleSoortResponse = new Soorts({
				_id: '525cf20451979dea2c000001',
				name: 'New Soort'
			});

			// Fixture mock form input values
			scope.name = 'New Soort';

			// Set POST response
			$httpBackend.expectPOST('soorts', sampleSoortPostData).respond(sampleSoortResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Soort was created
			expect($location.path()).toBe('/soorts/' + sampleSoortResponse._id);
		}));

		it('$scope.update() should update a valid Soort', inject(function(Soorts) {
			// Define a sample Soort put data
			var sampleSoortPutData = new Soorts({
				_id: '525cf20451979dea2c000001',
				name: 'New Soort'
			});

			// Mock Soort in scope
			scope.soort = sampleSoortPutData;

			// Set PUT response
			$httpBackend.expectPUT(/soorts\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/soorts/' + sampleSoortPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid soortId and remove the Soort from the scope', inject(function(Soorts) {
			// Create new Soort object
			var sampleSoort = new Soorts({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Soorts array and include the Soort
			scope.soorts = [sampleSoort];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/soorts\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleSoort);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.soorts.length).toBe(0);
		}));
	});
}());