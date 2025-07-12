const blogRouter = require('express').Router();
const logger = require('../utils/logger');
const Blog = require('../models/blog');

blogRouter.get('/', async (request, response, next) => {
	const blogs = await Blog.find({});
	response.json(blogs);
});

blogRouter.post('/', async (request, response, next) => {
	const { title, author, likes } = request.body;

	if (!response.contentType) {
		response.status(400).end();
	}

	if (!title || !author)
		response.status(400).end();

	logger.info(request.body);
	const blog = new Blog(
		{
			title: title,
			author: author,
			likes: likes || 0
		}
	);

	const result = await blog.save();
	response.status(201).json(result);
});

blogRouter.put('/:id', async (request, response, next) => {
	const id = request.params.id;
	const { likes } = request.body;

	if (!likes) response.status(400).end();

	const blog = await Blog.findById(id);

	blog.likes = likes;

	await blog.save();
	response.status(200).json(blog);
});

blogRouter.delete('/:id', async (request, response, next) => {
	const id = request.params.id;

	await Blog.findByIdAndDelete(id);
	response.status(204).end();
});

module.exports = blogRouter;
