import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/login';

const login = async credentials => {
	const response = await axios.post(baseUrl, credentials);
	console.log(response);
	return response.data;
};

export default login;
