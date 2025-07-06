import axios from 'axios';

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/';

const GetAll = async () => {
	const request = axios.get(`${baseUrl}/all`)
	return request.then((response) => response.data);
}

const GetWeather = async (city) => {
	const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_API_KEY}`)
	return request.then((response) => response.data);
}

export default {GetAll, GetWeather};
