const blogRouter = require('express').Router();
const logger = require('../utils/logger');
const Blog = require('../models/blog');
const User = require('../models/user');

const { userExtractor, tokenExtractor } = require('../utils/middleware');

const jwt = require('jsonwebtoken');

const validateToken = async (request, response) => {
	const decodedToken = jwt.verify(request.token, process.env.SECRET);
	// decoded token includes user.id
	if (!decodedToken.id) {
		response.status(401).json({ error: 'token error' });
	}
	return decodedToken;
};

blogRouter.get('/', async (request, response, next) => {
	const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 });
	response.json(blogs);
});

blogRouter.post('/', tokenExtractor , userExtractor, async (request, response, next) => {
	const { url, title, author, likes } = request.body;


	if (!response.contentType) {
		response.status(400).end();
	}

	if (!title || !author)
		response.status(400).end();

	logger.info(request.body);
	const blog = new Blog(
		{
			url: url,
			title: title,
			author: author,
			likes: likes || 0,
			user: request.user.userId
		}
	);


	const user = await User.findById(request.user.userId);
	user.blogs = [...user.blogs, blog._id];
	await user.save();

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

blogRouter.delete('/:id', tokenExtractor, userExtractor, async (request, response) => {
	const id = request.params.id;

	const decodedToken = await validateToken(request, response);

	const blog = await Blog.findById(id);
	if (!blog) {
		response.status(204).end();
	}

	// check if the decoded id matches the owner of the blog
	if (blog.user.toString() === decodedToken.id) {
		await Blog.findByIdAndDelete(blog._id);
	} else {
		response.status(401).json({ error: 'invalid token' });
	}

	response.status(204).end();
});

module.exports = blogRouter;
