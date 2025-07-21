import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
	token = `Bearer ${newToken}`
}

const getAll = () => {
	const config = {
		headers: { authorization: token }
	}

	const request = axios.get(baseUrl, config)
	return request.then(response => response.data)
}

// newBlog { title, author, url }
const create = async (newBlog) => {
	const config = {
		headers: { authorization: token }
	}

	try {
		const response = await axios.post(baseUrl, newBlog, config)
	} catch (exception) {
		console.log(exception)
	}
}

const update = async (blog) => {
	const config = {
		headers: { authorization: token }
	}

	const updatedBlog = {
		user: blog.user.id,
		likes: blog.likes,
		author: blog.author,
		title: blog.title,
		url: blog.url
	}

	try {
		await axios.put(baseUrl + `/${blog.id}`, updatedBlog, config)
	} catch (exception) {
		console.log(exception.response.data.error)
	}
}

const remove = async (id) => {
	const config = {
		headers: { authorization: token }
	}

	try {
		await axios.delete(baseUrl + `/${id}`, config)
	} catch (exception) {
		console.log(exception.response.data.error)
	}
}

export default { getAll, create, update, remove, setToken }
