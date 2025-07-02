import { useState } from 'react';
import './App.css'

const Button = (props: {text: string, onClick: () => void}) => (
	<button onClick={props.onClick}>
	{ props.text }
	</button>
)

const App = () => {
	const [value, setValue] = useState<number>(0);

	const handleClick = (who: string) => () => {
		console.log(`hello ${who}`)
	};

	const addValue = (amount: number) => () => {
		setValue(value + amount);
	}


	return (
		<div>
		{value}
		<Button text="hello" onClick={handleClick("tomi")}/>
		<Button text="add" onClick={addValue(100)}/>
		</div>
	)
}

export default App
