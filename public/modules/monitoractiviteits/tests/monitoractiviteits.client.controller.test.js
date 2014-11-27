'use strict';

(function() {
	// Monitoractiviteits Controller Spec
	describe('Monitoractiviteits Controller Tests', function() {
		// Initialize global variables
		var MonitoractiviteitsController,
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

			// Initialize the Monitoractiviteits controller.
			MonitoractiviteitsController = $controller('MonitoractiviteitsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Monitoractiviteit object fetched from XHR', inject(function(Monitoractiviteits) {
			// Create sample Monitoractiviteit using the Monitoractiviteits service
			var sampleMonitoractiviteit = new Monitoractiviteits({
				name: 'New Monitoractiviteit'
			});

			// Create a sample Monitoractiviteits array that includes the new Monitoractiviteit
			var sampleMonitoractiviteits = [sampleMonitoractiviteit];

			// Set GET response
			$httpBackend.expectGET('monitoractiviteits').respond(sampleMonitoractiviteits);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.monitoractiviteits).toEqualData(sampleMonitoractiviteits);
		}));

		it('$scope.findOne() should create an array with one Monitoractiviteit object fetched from XHR using a monitoractiviteitId URL parameter', inject(function(Monitoractiviteits) {
			// Define a sample Monitoractiviteit object
			var sampleMonitoractiviteit = new Monitoractiviteits({
				name: 'New Monitoractiviteit'
			});

			// Set the URL parameter
			$stateParams.monitoractiviteitId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/monitoractiviteits\/([0-9a-fA-F]{24})$/).respond(sampleMonitoractiviteit);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.monitoractiviteit).toEqualData(sampleMonitoractiviteit);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Monitoractiviteits) {
			// Create a sample Monitoractiviteit object
			var sampleMonitoractiviteitPostData = new Monitoractiviteits({
				name: 'New Monitoractiviteit'
			});

			// Create a sample Monitoractiviteit response
			var sampleMonitoractiviteitResponse = new Monitoractiviteits({
				_id: '525cf20451979dea2c000001',
				name: 'New Monitoractiviteit'
			});

			// Fixture mock form input values
			scope.name = 'New Monitoractiviteit';

			// Set POST response
			$httpBackend.expectPOST('monitoractiviteits', sampleMonitoractiviteitPostData).respond(sampleMonitoractiviteitResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Monitoractiviteit was created
			expect($location.path()).toBe('/monitoractiviteits/' + sampleMonitoractiviteitResponse._id);
		}));

		it('$scope.update() should update a valid Monitoractiviteit', inject(function(Monitoractiviteits) {
			// Define a sample Monitoractiviteit put data
			var sampleMonitoractiviteitPutData = new Monitoractiviteits({
				_id: '525cf20451979dea2c000001',
				name: 'New Monitoractiviteit'
			});

			// Mock Monitoractiviteit in scope
			scope.monitoractiviteit = sampleMonitoractiviteitPutData;

			// Set PUT response
			$httpBackend.expectPUT(/monitoractiviteits\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/monitoractiviteits/' + sampleMonitoractiviteitPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid monitoractiviteitId and remove the Monitoractiviteit from the scope', inject(function(Monitoractiviteits) {
			// Create new Monitoractiviteit object
			var sampleMonitoractiviteit = new Monitoractiviteits({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Monitoractiviteits array and include the Monitoractiviteit
			scope.monitoractiviteits = [sampleMonitoractiviteit];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/monitoractiviteits\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleMonitoractiviteit);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.monitoractiviteits.length).toBe(0);
		}));
	});
}());