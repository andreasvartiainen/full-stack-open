import './App.css'

const App = () => {
	const handleClick = (who: string) => () => {
		console.log(`hello ${who}`)
	};

	return (
		<div>
		<button onClick={handleClick("me")}>BUTTON</button>
		</div>
	)
}

export default App
