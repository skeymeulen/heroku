'use strict';

(function() {
	// Vakanties Controller Spec
	describe('Vakanties Controller Tests', function() {
		// Initialize global variables
		var VakantiesController,
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

			// Initialize the Vakanties controller.
			VakantiesController = $controller('VakantiesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Vakantie object fetched from XHR', inject(function(Vakanties) {
			// Create sample Vakantie using the Vakanties service
			var sampleVakantie = new Vakanties({
				name: 'New Vakantie'
			});

			// Create a sample Vakanties array that includes the new Vakantie
			var sampleVakanties = [sampleVakantie];

			// Set GET response
			$httpBackend.expectGET('vakanties').respond(sampleVakanties);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.vakanties).toEqualData(sampleVakanties);
		}));

		it('$scope.findOne() should create an array with one Vakantie object fetched from XHR using a vakantieId URL parameter', inject(function(Vakanties) {
			// Define a sample Vakantie object
			var sampleVakantie = new Vakanties({
				name: 'New Vakantie'
			});

			// Set the URL parameter
			$stateParams.vakantieId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/vakanties\/([0-9a-fA-F]{24})$/).respond(sampleVakantie);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.vakantie).toEqualData(sampleVakantie);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Vakanties) {
			// Create a sample Vakantie object
			var sampleVakantiePostData = new Vakanties({
				name: 'New Vakantie'
			});

			// Create a sample Vakantie response
			var sampleVakantieResponse = new Vakanties({
				_id: '525cf20451979dea2c000001',
				name: 'New Vakantie'
			});

			// Fixture mock form input values
			scope.name = 'New Vakantie';

			// Set POST response
			$httpBackend.expectPOST('vakanties', sampleVakantiePostData).respond(sampleVakantieResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Vakantie was created
			expect($location.path()).toBe('/vakanties/' + sampleVakantieResponse._id);
		}));

		it('$scope.update() should update a valid Vakantie', inject(function(Vakanties) {
			// Define a sample Vakantie put data
			var sampleVakantiePutData = new Vakanties({
				_id: '525cf20451979dea2c000001',
				name: 'New Vakantie'
			});

			// Mock Vakantie in scope
			scope.vakantie = sampleVakantiePutData;

			// Set PUT response
			$httpBackend.expectPUT(/vakanties\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/vakanties/' + sampleVakantiePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid vakantieId and remove the Vakantie from the scope', inject(function(Vakanties) {
			// Create new Vakantie object
			var sampleVakantie = new Vakanties({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Vakanties array and include the Vakantie
			scope.vakanties = [sampleVakantie];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/vakanties\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleVakantie);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.vakanties.length).toBe(0);
		}));
	});
}());