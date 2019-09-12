const request = require('supertest');
const app = require('../../app');
const { generateAuthToken } = require('../../controllers/utils');

describe('CheckAuthorization MiddleWare', () => {
	let token;

	const exec = () =>
		request(app)
			.post('/api/patch-json')
			.set('Authorization', token);
	beforeEach(() => {
		token = `Bearer ${generateAuthToken({ username: 'tester' })}`;
	});

	it('should return 401 if token is not provided or invalid', done => {
		token = '';
		exec().expect(401, done);
	});
});

describe('Validation middleware', () => {
	describe('validateLogin', () => {
		let username;
		let password;
		const exec = () =>
			request(app)
				.post('/api/user/login')
				.send({
					username,
					password
				});
		beforeEach(() => {
			username = 'tester';
			password = 'tester';
		});
		it('should return 400 if username is not provided or invalid', done => {
			username = '';
			exec().expect(400, done);
		});
		it('should return 400 if password is not provided or invalid', done => {
			password = '';
			exec().expect(400, done);
		});
	});

	describe('validateImage', () => {
		let imageUrl;
		let token;

		console.log(imageUrl, token);
		const exec = () =>
			request(app)
				.post('/api/create-thumbnail')
				.set('Authorization', token)
				.send({ imageUrl });
		beforeEach(() => {
			imageUrl = '/public/images/';
			token = `Bearer ${generateAuthToken({ username: 'tester' })}`;
		});
		it('should return 400 if imageUrl is not provided', done => {
			imageUrl = '';
			exec().expect(400, done);
		});
		it('should return 400 if imageUrl is not valid', done => {
			exec().expect(400, done);
		});
	});

	describe('validateJsonPatch', () => {
		let json;
		let patch;
		let token;

		const exec = () =>
			request(app)
				.post('/api/patch-json')
				.set('Authorization', token)
				.send({
					json,
					patch
				});
		beforeEach(() => {
			json = JSON.stringify({});
			patch = JSON.stringify([]);
			token = `Bearer ${generateAuthToken({ username: 'tester' })}`;
		});
		it('should return 401 if json is invalid or not provided', done => {
			json = 'string';
			exec().expect(400, done);
		});
		it('should return 401 if patch is invalid or not provided', done => {
			patch = 'string';
			exec().expect(400, done);
		});
	});
});
