const { test, describe } = require('node:test');
const assert = require('node:assert');
const listHelper = require('../utils/list_helper');
const helper = require('./helper');

// jus a dummy
test('dummy returns one', () => {
	const blogs = [];

	const result = listHelper.dummy(blogs);
	assert.strictEqual(result, 1);
});

// likes
describe('total likes', () => {
	test('when list has zero blogs, likes equal zero', () => {
		const result = listHelper.totalLikes([]);
		assert.strictEqual(result, 0);
	});

	test('when list has only one blog, equals the likes of that', () => {
		const result = listHelper.totalLikes(helper.oneBlog);
		assert.strictEqual(result, 5);
	});

	test('when list has many blogs, equal is counted correctly', () => {
		const result = listHelper.totalLikes(helper.blogs);
		assert.strictEqual(result, 36);
	});
});

// favourite tests
describe('favourite', () => {

	test('favourite blog of empty function is undefined', () => {
		const result = listHelper.favouriteBlog([]);
		assert.strictEqual(result, undefined);
	});

	test('favourite blog of array with one blog is itself', () => {
		const result = listHelper.favouriteBlog(helper.oneBlog);
		assert.deepStrictEqual(result, helper.oneBlog[0]);
	});

	test('the blog with most likes is, "Canonical string reduction"', () => {
		const result = listHelper.favouriteBlog(helper.blogs);
		assert.deepStrictEqual(helper.blogs[2], result);
	});

});

//most blogs
describe('most blogs', () => {

	test('zero blogs results undefined', () => {
		const result = listHelper.mostBlogs([]);
		assert.deepStrictEqual(result, undefined );
	});

	test('single blog results itself', () => {
		const result = listHelper.mostBlogs(helper.oneBlog);
		assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', blogs: 1 });
	});

	test('author who has most blogs is', () => {
		const result = listHelper.mostBlogs(helper.blogs);
		assert.deepStrictEqual(result, { author: 'Robert C. Martin', blogs: 3 });
	});
});

// most likes
describe('most likes', () => {

	test('zero blogs results undefined', () => {
		const result = listHelper.mostLikes([]);
		assert.deepStrictEqual(result, undefined );
	});

	test('single blog results itself', () => {
		const result = listHelper.mostLikes(helper.oneBlog);

		assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', likes: 5 });
	});

	test('author who has most blogs is', () => {
		const result = listHelper.mostLikes(helper.blogs);
		assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', likes: 17 });
	});
});
