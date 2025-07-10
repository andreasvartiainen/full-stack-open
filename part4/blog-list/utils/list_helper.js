const dummy = (blogs) => {
	return 1;
};

const totalLikes = (blogs) => {
	// get total sum of likes
	return blogs.reduce((s, p) => s + p.likes, 0);
};

const favouriteBlog = (blogs) => {
	if (blogs.length === 0) return undefined;
	if (blogs.length === 1) return blogs[0];

	const mostLikes = Math.max(...blogs.map((blog) => blog.likes));
	return blogs.find((blog) => blog.likes === mostLikes);
};

const mostBlogs = (blogs) => {
	if (blogs.length === 0) {
		return undefined;
	}

	if (blogs.length === 1) {
		return { author: blogs[0].author, blogs: 1 };
	}

	let hashmap = {};
	blogs.forEach((blog) => {
		if (Object.keys(hashmap).find((author) => blog.author === author))
		{
			hashmap[blog.author] += 1;
			return;
		}
		hashmap[blog.author] = 1;
	});

	const _mostBlogs = Math.max(...Object.values(hashmap));
	for (const [key, value] of Object.entries(hashmap)) {
		if (value === _mostBlogs) {
			return { author: key, blogs: value };
		}
	}
};

// this can be probably cut in smaller pieces with the mostBlocks function
const mostLikes = (blogs) => {
	if (blogs.length === 0) {
		return undefined;
	}

	if (blogs.length === 1) {
		return { author: blogs[0].author, likes: blogs[0].likes };
	}

	let hashmap = {};
	blogs.forEach((blog) => {
		if (Object.keys(hashmap).find((author) => blog.author === author))
		{
			hashmap[blog.author] += blog.likes;
			return;
		}
		hashmap[blog.author] = blog.likes;
	});

	const _mostLikes = Math.max(...Object.values(hashmap));
	for (const [key, value] of Object.entries(hashmap)) {
		if (value === _mostLikes) {
			return { author: key, likes: value };
		}
	}
};

module.exports = {
	dummy,
	totalLikes,
	favouriteBlog,
	mostBlogs,
	mostLikes
};
