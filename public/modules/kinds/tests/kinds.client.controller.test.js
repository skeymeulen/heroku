'use strict';

(function() {
	// Kinds Controller Spec
	describe('Kinds Controller Tests', function() {
		// Initialize global variables
		var KindsController,
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

			// Initialize the Kinds controller.
			KindsController = $controller('KindsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Kind object fetched from XHR', inject(function(Kinds) {
			// Create sample Kind using the Kinds service
			var sampleKind = new Kinds({
				name: 'New Kind'
			});

			// Create a sample Kinds array that includes the new Kind
			var sampleKinds = [sampleKind];

			// Set GET response
			$httpBackend.expectGET('kinds').respond(sampleKinds);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.kinds).toEqualData(sampleKinds);
		}));

		it('$scope.findOne() should create an array with one Kind object fetched from XHR using a kindId URL parameter', inject(function(Kinds) {
			// Define a sample Kind object
			var sampleKind = new Kinds({
				name: 'New Kind'
			});

			// Set the URL parameter
			$stateParams.kindId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/kinds\/([0-9a-fA-F]{24})$/).respond(sampleKind);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.kind).toEqualData(sampleKind);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Kinds) {
			// Create a sample Kind object
			var sampleKindPostData = new Kinds({
				name: 'New Kind'
			});

			// Create a sample Kind response
			var sampleKindResponse = new Kinds({
				_id: '525cf20451979dea2c000001',
				name: 'New Kind'
			});

			// Fixture mock form input values
			scope.name = 'New Kind';

			// Set POST response
			$httpBackend.expectPOST('kinds', sampleKindPostData).respond(sampleKindResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Kind was created
			expect($location.path()).toBe('/kinds/' + sampleKindResponse._id);
		}));

		it('$scope.update() should update a valid Kind', inject(function(Kinds) {
			// Define a sample Kind put data
			var sampleKindPutData = new Kinds({
				_id: '525cf20451979dea2c000001',
				name: 'New Kind'
			});

			// Mock Kind in scope
			scope.kind = sampleKindPutData;

			// Set PUT response
			$httpBackend.expectPUT(/kinds\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/kinds/' + sampleKindPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid kindId and remove the Kind from the scope', inject(function(Kinds) {
			// Create new Kind object
			var sampleKind = new Kinds({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Kinds array and include the Kind
			scope.kinds = [sampleKind];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/kinds\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleKind);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.kinds.length).toBe(0);
		}));
	});
}());