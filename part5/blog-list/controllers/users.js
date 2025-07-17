const User = require('../models/user');
const bcrypt = require('bcrypt');

const userRouter = require('express').Router();

userRouter.get('/', async ( _ , response) => {
	const users = await User.find({})
		.populate('blogs', { url: 1, title: 1, author: 1, id: 1 });
	response.status(200).json(users);
});

userRouter.post('/', async (request, response) => {
	const { username, name, password } = request.body;

	if (password.length < 3) {
		response.status(400).json({ error: 'password is too short (minimum length 3 symbols)' });
	}

	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(password, saltRounds);

	const user = new User({
		username: username,
		name: name,
		passwordHash: passwordHash
	});

	await user.save();

	response.status(201).send('user created');
});

module.exports = userRouter;

