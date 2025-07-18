require('dotenv').config();

const PORT = process.env.PORT;

// use test db uri if in test mode
const MONGODB_URI = process.env.NODE_ENV === 'test'
	? process.env.TEST_MONGODB_URI
	: process.env.MONGODB_URI;

module.exports = {
	PORT,
	MONGODB_URI
};
