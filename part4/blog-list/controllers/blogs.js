const blogRouter = require('express').Router();
const logger = require('../utils/logger');
const Blog = require('../models/blog');

blogRouter.get('/', (request, response) => {
	Blog.find({}).then((blogs) => {
		response.json(blogs);
	});
});

blogRouter.post('/', (request, response, next) => {
	logger.info(request.body);
	const blog = new Blog(request.body);

	blog.save().then((result) => {
		response.status(201).json(result);
	})
		.catch(error => next(error));
});

module.exports = blogRouter;
