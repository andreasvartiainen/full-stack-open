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

export default Footer;
