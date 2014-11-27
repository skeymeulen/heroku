'use strict';

(function() {
	// Monitors Controller Spec
	describe('Monitors Controller Tests', function() {
		// Initialize global variables
		var MonitorsController,
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

			// Initialize the Monitors controller.
			MonitorsController = $controller('MonitorsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Monitor object fetched from XHR', inject(function(Monitors) {
			// Create sample Monitor using the Monitors service
			var sampleMonitor = new Monitors({
				name: 'New Monitor'
			});

			// Create a sample Monitors array that includes the new Monitor
			var sampleMonitors = [sampleMonitor];

			// Set GET response
			$httpBackend.expectGET('monitors').respond(sampleMonitors);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.monitors).toEqualData(sampleMonitors);
		}));

		it('$scope.findOne() should create an array with one Monitor object fetched from XHR using a monitorId URL parameter', inject(function(Monitors) {
			// Define a sample Monitor object
			var sampleMonitor = new Monitors({
				name: 'New Monitor'
			});

			// Set the URL parameter
			$stateParams.monitorId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/monitors\/([0-9a-fA-F]{24})$/).respond(sampleMonitor);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.monitor).toEqualData(sampleMonitor);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Monitors) {
			// Create a sample Monitor object
			var sampleMonitorPostData = new Monitors({
				name: 'New Monitor'
			});

			// Create a sample Monitor response
			var sampleMonitorResponse = new Monitors({
				_id: '525cf20451979dea2c000001',
				name: 'New Monitor'
			});

			// Fixture mock form input values
			scope.name = 'New Monitor';

			// Set POST response
			$httpBackend.expectPOST('monitors', sampleMonitorPostData).respond(sampleMonitorResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Monitor was created
			expect($location.path()).toBe('/monitors/' + sampleMonitorResponse._id);
		}));

		it('$scope.update() should update a valid Monitor', inject(function(Monitors) {
			// Define a sample Monitor put data
			var sampleMonitorPutData = new Monitors({
				_id: '525cf20451979dea2c000001',
				name: 'New Monitor'
			});

			// Mock Monitor in scope
			scope.monitor = sampleMonitorPutData;

			// Set PUT response
			$httpBackend.expectPUT(/monitors\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/monitors/' + sampleMonitorPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid monitorId and remove the Monitor from the scope', inject(function(Monitors) {
			// Create new Monitor object
			var sampleMonitor = new Monitors({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Monitors array and include the Monitor
			scope.monitors = [sampleMonitor];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/monitors\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleMonitor);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.monitors.length).toBe(0);
		}));
	});
}());