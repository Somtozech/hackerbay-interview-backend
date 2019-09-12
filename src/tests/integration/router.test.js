const request = require('supertest');
const { expect } = require('chai');
const app = require('../../app');
const { generateAuthToken } = require('../../controllers/utils');

describe('Authentication', () => {
	describe('POST api/user/login', () => {
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

		it('should return a token on success', done => {
			exec()
				.expect(200)
				.then(res => {
					expect(res.body).to.have.property('data');
					expect(res.body.data).to.have.property('token');
					expect(res.body.data.token).to.be.a('string');
					done();
				});
		});

		it('should return 400 if username is invalid', done => {
			username = '';
			exec().expect(400, done);
		});

		it('should return 400 if password is invalid', done => {
			password = '';
			exec().expect(400, done);
		});
	});
});

describe('JSON PATCHING', () => {
	describe('POST api/create-thumbnail', () => {
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
			json = JSON.stringify({
				baz: 'qux',
				foo: 'bar'
			});
			patch = JSON.stringify([
				{ op: 'replace', path: '/baz', value: 'boo' },
				{ op: 'add', path: '/hello', value: ['world'] },
				{ op: 'remove', path: '/foo' }
			]);
			token = `Bearer ${generateAuthToken({ username: 'tester' })}`;
		});

		it('should return a patched json in the response', done => {
			exec()
				.expect(200)
				.then(res => {
					expect(res.body).to.have.property('data');
					expect(res.body.data).to.have.property('patched');
					done();
				});
		});

		it('should return 401 if token is invalid or not present in the authorization header', done => {
			token = null;
			exec().expect(401, done);
		});

		it('should return 401 if json field is invalid', done => {
			json = 'je';
			exec().expect(400, done);
		});

		it('should return 401 if json field is invalid', done => {
			patch = 'patch';
			exec().expect(400, done);
		});
	});
});

describe('Image Thumbnail Creation', () => {
	describe('POST /api/create-thumbnail', () => {
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

		it('should return 400 if the image url is invalid', done => {
			exec().expect(400, done);
		});
		it('should return 401 if token is invalid or not present', done => {
			token = null;
			exec().expect(401, done);
		});
	});
});
