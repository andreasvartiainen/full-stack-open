import { useEffect, useState } from "react";
import services from "./services/services";

const DetailView = ({country}) => {
	let languages = []
	Object.keys(country.languages).forEach((key, index) => {
		languages.push(<li key={country.languages[key]}>{ country.languages[key]} </li>)})

	// detail view for showing one element
	return (
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
}

const Country = ({country, isDetail, onClick}) => {
	const listView = <div>{country.name.common}<button onClick={() => onClick(country)}>Show</button></div>;

	return (
		<>
		{isDetail ?  <DetailView country={country}/> : listView}
		</>
	)
}

const CountryList = ({countries, onClick}) => {
	const countryList = countries?.map((country) => <Country key={country.name.common} country={country} isDetail={false} onClick={onClick}/>)

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
	const [select, setSelect] = useState(null);

	useEffect(() => {
		services.GetAll().then(
			(response) => {
				setCountries(response)
			}
		)
	}, []);

	const handleChange = (event) => {
		setSearch(event.target.value);
		setSelect(null);
	}

	const handleSelect = (country) => {
		setSelect(country);
	}

	const foundCountries = countries
			?.filter((country) => country.name.common.includes(search))

	const renderView = (
		<>
		{search !== '' 
			? (
				foundCountries?.length < 10 
				? <CountryList countries={foundCountries} onClick={handleSelect}/> 
				: "Too many matches"
				) 
			: null}
		</>
	)

	return (
		<div>
		<div>
		find countries:
		<input value={search} onChange={handleChange}/>
		</div>
		{select ? <DetailView country={select} /> : renderView}
		</div>
	)
}

export default App;
