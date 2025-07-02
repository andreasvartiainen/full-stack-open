import { useState } from 'react';
import './App.css'
import Counter from './components/counter';
import Footer from './components/footer';
import Hello from './components/hello';
import Hello_props from './components/helloProps';
import Button from './components/button';

export interface Props {
	name: string;
	age: number;
}

const App = () => {
	const [counter, setCounter] = useState(0);

	const increaseByOne = () => {
		console.log("plus 1");
		setCounter(counter + 1);
	}

	const decreaseByOne = () => {
		console.log("minus 1");
		setCounter(counter - 1);
	}

	const setToZero = () => {
		console.log("setting to zero");
		setCounter(0);
	}

	return (
		<>
		<Hello name='Tomi' age={26}/>
		<Counter counter={counter}/>
		<Button text="-" onClick={decreaseByOne} />
		<Button text="0" onClick={setToZero} />
		<Button text="+" onClick={increaseByOne} />
		</>
	)
}

export default App
