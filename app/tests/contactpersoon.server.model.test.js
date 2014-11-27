'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Contactpersoon = mongoose.model('Contactpersoon');

/**
 * Globals
 */
var user, contactpersoon;

/**
 * Unit tests
 */
describe('Contactpersoon Model Unit Tests:', function() {
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
			contactpersoon = new Contactpersoon({
				name: 'Contactpersoon Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return contactpersoon.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			contactpersoon.name = '';

			return contactpersoon.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Contactpersoon.remove().exec();
		User.remove().exec();

		done();
	});
});