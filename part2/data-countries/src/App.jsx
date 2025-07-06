import { useEffect, useState } from "react";
import services from "./services/services";

const Country = ({country, isDetail}) => {
	const listView = <div>{country.name.common}</div>;

	let languages = []
	Object.keys(country.languages).forEach((key, index) => {
		languages.push(<li key={country.languages[key]}>{ country.languages[key]}</li>)})

	// debugging
	if (isDetail) {
		console.log(country);
		console.log(country.languages);
		console.log(languages);
	}

	// detail view for showing one element
	const detailView = (
		<>
		<h1>{country.name.common}</h1>
		<div>Capital: {country.capital[0]}</div>
		<div>Area: {country.area}</div>
		<h1>Languages</h1>
		<ul>
		{languages}
		</ul>
		<img src={country.flags.png}/>
		</>
	)

	return (
		<>
		{isDetail ?  detailView : listView}
		</>
	)
}

const CountryList = ({countries}) => {
	const countryList = countries?.map((country) => <Country key={country.name.common} country={country} isDetail={false}/>)

	return (
		<>
		{countries.length === 1 
			? <Country country={countries[0]} isDetail={true}/> 
			: countryList}
		</>
	);
}

const App = () => {
	const [countries, setCountries] = useState(null);
	const [search, setSearch] = useState('');

	useEffect(() => {
		services.GetAll().then(
			(response) => {
				setCountries(response)
			}
		)
	}, []);

	const handleChange = (event) => {
		setSearch(event.target.value);
	}

	const foundCountries = countries
			?.filter((country) => country.name.common.includes(search))

	return (
		<div>
		<div>
		find countries:
		<input value={search} onChange={handleChange}/>
		</div>
		{search !== '' ? (foundCountries?.length < 10 ? <CountryList countries={foundCountries}/> : "Too many matches") : null}
		</div>
	)
}

export default App;
