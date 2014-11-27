'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Inschrijving = mongoose.model('Inschrijving');

/**
 * Globals
 */
var user, inschrijving;

/**
 * Unit tests
 */
describe('Inschrijving Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			inschrijving = new Inschrijving({
				name: 'Inschrijving Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return inschrijving.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			inschrijving.name = '';

			return inschrijving.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Inschrijving.remove().exec();
		User.remove().exec();

		done();
	});
});