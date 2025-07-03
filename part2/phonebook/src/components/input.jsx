const Input = ({name, text, value, onChange}) => {
	return (
		<div>
			{text}: <input name={name} value={value} onChange={onChange}/>
		</div>
	)
}

export default Input;
