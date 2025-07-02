const Hello_props = (props: any) => {
	console.log(props);
	return (
		<div>
			<p>Hello { props.name } age {props.age}</p>
		</div>
	)
}

export default Hello_props;
