const logger = require('./logger');

const jwt = require('jsonwebtoken');

const requestLogger = (request, response, next) => {
	logger.info('Method:', request.method);
	logger.info('Path:', request.path);
	logger.info('Body:', request.body);
	logger.info('---');
	next();
};

const unknownEndpoint = (request, response) => {
	return response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
	switch (error.name) {
	case 'CastError': {
		return response.status(400).send({ error: 'malformed id' });
	}
	case 'MongoServerError': {
		if (error.message.includes('E11000 duplicate key error')) {
			return response.status(400).json({ error: 'expected `username` to be unique' });
		}
		return response.status(400).send({ error: 'MongoServerError' });
	}
	case 'ValidationError': {
		return response.status(400).json({ error: 'username is shorter than 3 letters' });
	}
	case 'JsonWebTokenError': {
		return response.status(401).json({ error: 'token invalid' });
	}
	default: next(error);
	}
};

const getTokenFrom = async request => {
	const authorization = request.get('authorization');
	if (authorization && authorization.startsWith('Bearer ')) {
		return authorization.replace('Bearer ', '');
	}
	return null;
};

// extract token from request and attach it to request.token field
const tokenExtractor = async (request, response, next) => {
	// if (request.method === 'GET')
	// 	return next();
	const token = await getTokenFrom(request);
	request.token = token;
	next();
};

const getUserFromToken = async (request, response) => {
	const decodedToken = jwt.verify(request.token, process.env.SECRET);
	// decoded token includes user.id
	if (!decodedToken.id) {
		response.status(401).json({ error: 'token error' });
	}
	// logger.info('getUserFromToken', decodedToken);
	return { username: decodedToken.username, userId: decodedToken.id };
};

const userExtractor = async (request, response, next) => {
	// if (request.method === 'GET')
	// 	return next();
	request.user = await getUserFromToken(request, response);
	next();
};

module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler,
	tokenExtractor,
	userExtractor,
};
