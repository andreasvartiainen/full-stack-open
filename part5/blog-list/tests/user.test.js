const { test, describe, after, beforeEach } = require('node:test');
const helper = require('./helper');
const mongoose = require('mongoose');
const supertest = require('supertest');
const assert = require('node:assert');
const app = require('../app');

const api = supertest(app);
const User = require('../models/user');

beforeEach( async () => {
	await User.deleteMany({});
	await User.insertMany(helper.initialUsers);
});

describe('User Tests', async () => {
	test('Users are added correctly', async () => {
		const usersBefore = await helper.getUsersInDb();

		const newUser = {
			username: 'Esko',
			name: 'Esko Latvasta Laho',
			password: 'passss'
		};

		await api.post('/api/users')
			.send(newUser)
			.expect(201);

		const usersAfter = await helper.getUsersInDb();

		const names = usersAfter.map((user) => user.username);

		assert.strictEqual(usersAfter.length, usersBefore.length + 1);
		assert(names.includes(newUser.username));
	});

	test('Invalid user returns 400', async () => {
		const usersBefore = await helper.getUsersInDb();

		const newUser = {
			username: 'Es',
			name: 'Esko Latvasta Laho',
			password: 'passss'
		};

		await api.post('/api/users')
			.send(newUser)
			.expect(400);

		const usersAfter = await helper.getUsersInDb();

		const names = usersAfter.map((user) => user.username);

		assert.strictEqual(usersAfter.length, usersBefore.length);
		assert(!names.includes(newUser.username));
	});
});

after( async () => {
	await mongoose.connection.close();
});

