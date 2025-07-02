import './App.css'

interface Props {
	name: string;
}

const Footer = () => {
	const creators = [
		{name: 'Tomi', age: 26},
		{name: 'Sidepersonality', age: 26},
	]

	return (
		<div>
		{creators[0].name} {creators[0].age}
		{creators[1].name} {creators[1].age}
		</div>
	)
}

const Hello_props = (props: any) => {
	console.log(props);
	return (
		<div>
			<p>Hello { props.name } age {props.age}</p>
		</div>
	)
}

const Hello = ({name}: Props) => {
	return (
		<div>
		 <p>Hello {name}</p>
		</div>
	)
}

const App = () => {
	return (
		<>
		<Hello name='Tomi'/>
		<Hello_props name='Tomi' age='26'/>
		<Footer />
		</>
	)
}

export default App
