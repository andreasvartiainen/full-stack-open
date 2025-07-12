const { test, describe, after, beforeEach } = require('node:test');
const helper = require('./helper');
const mongoose = require('mongoose');
const supertest = require('supertest');
const assert = require('node:assert');
const app = require('../app');

const api = supertest(app);
const Blog = require('../models/blog');

beforeEach( async () => {
	await Blog.deleteMany({});
	await Blog.insertMany(helper.initialBlogs);
});

describe.only('blog tests', async () => {
	await test('all blogs are returned in json format', async () => {
		const result = await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/);
		assert.strictEqual(result.body.length, helper.initialBlogs.length);
	});

	await test('id field of blog is named id', async () => {
		const result = await api.get('/api/blogs');

		// assert every blog and see if id is not undefined
		result.body.forEach((blog) =>
			assert.notStrictEqual(blog.id, undefined)
		);
	});
});

describe.only('update', async () => {
	await test('blog can be updated', async () => {
		const blogsAtStart = await helper.getBlogsInDb();

		// update likes
		await api
			.put(`/api/blogs/${blogsAtStart[0].id}`)
			.send({ likes: 5 })
			.expect(200);

		const blog = await Blog.findById(blogsAtStart[0].id);

		//:NOTE:
		//	remember to use toJSON
		assert.notDeepStrictEqual(blog.toJSON(), blogsAtStart[0]);
	});

	await test('if blog can\'t be found return 400', async () => {
		await api
			.put('/api/blogs/-1')
			.send({ likes: 69 })
			.expect(400);
	});
});

describe.only('delete', async () => {
	await test('blog can be deleted', async () => {
		const notesAtStart = await helper.getBlogsInDb();

		await api
			.delete(`/api/blogs/${notesAtStart[0].id}`)
			.expect(204);

		const notesAtEnd = await helper.getBlogsInDb();

		assert.strictEqual(notesAtEnd.length, notesAtStart.length - 1);
	});

});

describe.only('post', async () => {
	await test('blog can be added', async () => {
		const blogsAtStart = await helper.getBlogsInDb();

		const newBlog = {
			title: 'Hitchhiker\'s guide to galaxy',
			author: 'Douglas Addams',
			url: 'https://reactpatterns.com/',
			likes: 100000000,
		};

		const returnedBlog = await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/);

		const blogsAtEnd = await helper.getBlogsInDb();

		const allSame = blogsAtEnd.map((blog) => {
			return JSON.stringify(blog) === JSON.stringify(returnedBlog.body);
		});

		assert(allSame.includes(true));

		assert.strictEqual(blogsAtEnd.length, blogsAtStart.length + 1);
	});

	await test('blog can be added and likes default to 0', async () => {
		const newBlog = {
			title: 'Hitchhiker\'s guide to galaxy',
			author: 'Douglas Addams',
			url: 'https://reactpatterns.com/',
		};

		const returnedBlog = await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/);

		assert.strictEqual(returnedBlog.body.likes, 0);
	});

	await test('missing fields cause 400 Bad Request', async () => {
		const newBlog = {};

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(400);
	});
});

after( async () => {
	await mongoose.connection.close();
});
