import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
	token = `Bearer ${newToken}`;
};

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
		const response = await axios.post(baseUrl, newBlog, config);
	} catch (exception) {
		console.log(exception);
	}
}

export default { getAll, create, setToken }
