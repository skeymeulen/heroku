'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Monitoractiviteit = mongoose.model('Monitoractiviteit');

/**
 * Globals
 */
var user, monitoractiviteit;

/**
 * Unit tests
 */
describe('Monitoractiviteit Model Unit Tests:', function() {
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
			monitoractiviteit = new Monitoractiviteit({
				name: 'Monitoractiviteit Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return monitoractiviteit.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			monitoractiviteit.name = '';

			return monitoractiviteit.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Monitoractiviteit.remove().exec();
		User.remove().exec();

		done();
	});
});