'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Soort = mongoose.model('Soort'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, soort;

/**
 * Soort routes tests
 */
describe('Soort CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Soort
		user.save(function() {
			soort = {
				name: 'Soort Name'
			};

			done();
		});
	});

	it('should be able to save Soort instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Soort
				agent.post('/soorts')
					.send(soort)
					.expect(200)
					.end(function(soortSaveErr, soortSaveRes) {
						// Handle Soort save error
						if (soortSaveErr) done(soortSaveErr);

						// Get a list of Soorts
						agent.get('/soorts')
							.end(function(soortsGetErr, soortsGetRes) {
								// Handle Soort save error
								if (soortsGetErr) done(soortsGetErr);

								// Get Soorts list
								var soorts = soortsGetRes.body;

								// Set assertions
								(soorts[0].user._id).should.equal(userId);
								(soorts[0].name).should.match('Soort Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Soort instance if not logged in', function(done) {
		agent.post('/soorts')
			.send(soort)
			.expect(401)
			.end(function(soortSaveErr, soortSaveRes) {
				// Call the assertion callback
				done(soortSaveErr);
			});
	});

	it('should not be able to save Soort instance if no name is provided', function(done) {
		// Invalidate name field
		soort.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Soort
				agent.post('/soorts')
					.send(soort)
					.expect(400)
					.end(function(soortSaveErr, soortSaveRes) {
						// Set message assertion
						(soortSaveRes.body.message).should.match('Please fill Soort name');
						
						// Handle Soort save error
						done(soortSaveErr);
					});
			});
	});

	it('should be able to update Soort instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Soort
				agent.post('/soorts')
					.send(soort)
					.expect(200)
					.end(function(soortSaveErr, soortSaveRes) {
						// Handle Soort save error
						if (soortSaveErr) done(soortSaveErr);

						// Update Soort name
						soort.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Soort
						agent.put('/soorts/' + soortSaveRes.body._id)
							.send(soort)
							.expect(200)
							.end(function(soortUpdateErr, soortUpdateRes) {
								// Handle Soort update error
								if (soortUpdateErr) done(soortUpdateErr);

								// Set assertions
								(soortUpdateRes.body._id).should.equal(soortSaveRes.body._id);
								(soortUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Soorts if not signed in', function(done) {
		// Create new Soort model instance
		var soortObj = new Soort(soort);

		// Save the Soort
		soortObj.save(function() {
			// Request Soorts
			request(app).get('/soorts')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Soort if not signed in', function(done) {
		// Create new Soort model instance
		var soortObj = new Soort(soort);

		// Save the Soort
		soortObj.save(function() {
			request(app).get('/soorts/' + soortObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', soort.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Soort instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Soort
				agent.post('/soorts')
					.send(soort)
					.expect(200)
					.end(function(soortSaveErr, soortSaveRes) {
						// Handle Soort save error
						if (soortSaveErr) done(soortSaveErr);

						// Delete existing Soort
						agent.delete('/soorts/' + soortSaveRes.body._id)
							.send(soort)
							.expect(200)
							.end(function(soortDeleteErr, soortDeleteRes) {
								// Handle Soort error error
								if (soortDeleteErr) done(soortDeleteErr);

								// Set assertions
								(soortDeleteRes.body._id).should.equal(soortSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Soort instance if not signed in', function(done) {
		// Set Soort user 
		soort.user = user;

		// Create new Soort model instance
		var soortObj = new Soort(soort);

		// Save the Soort
		soortObj.save(function() {
			// Try deleting Soort
			request(app).delete('/soorts/' + soortObj._id)
			.expect(401)
			.end(function(soortDeleteErr, soortDeleteRes) {
				// Set message assertion
				(soortDeleteRes.body.message).should.match('User is not logged in');

				// Handle Soort error error
				done(soortDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Soort.remove().exec();
		done();
	});
});