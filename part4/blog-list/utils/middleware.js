const logger = require('./logger');

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
	default: next(error);
	}
};

module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler,
};
