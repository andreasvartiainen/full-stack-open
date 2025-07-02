import { useState } from 'react'

const Button = ({text, onClick}) => {
	return (
		<button onClick={onClick}>
		{text}
		</button>
	)
}

const Display = ({text, value}) => {
	return (
		<p>{text} {value}</p>
	)
}

const Statistics = ({good, neutral, bad}) => {
	const totalVotes = (good + neutral + bad)
	const totalScore = ((good * 1) + (neutral * 0) + (bad * -1))
	const average =  totalScore / totalVotes

	return (
		<>
		<Display text="good" value={good}/>
		<Display text="neutral" value={neutral}/>
		<Display text="bad" value={bad}/>
		<Display text="all" value={totalVotes}/>
		<Display text="average" value={average}/>
		<Display text="positive" value={`${good / totalVotes} %`}/>
		</>
	)
}

function App() {
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	const addGood = () => {
		setGood(good + 1);
	}
	const addNeutral = () => {
		setNeutral(neutral + 1);
	}
	const addBad = () => {
		setBad(bad + 1);
	}

	const showStatistics = 
		(good > 0 || neutral > 0 || bad > 0) ? 
				<Statistics good={good} neutral={neutral} bad={bad}/> :
				<p>No Feedback Given</p>
	
  return (
    <div>
			<h1>Give Feedback</h1>
				<Button text="good" onClick={addGood}/>
				<Button text="neutral" onClick={addNeutral}/>
				<Button text="bad" onClick={addBad}/>
			<h1>Statistics</h1>
			 	{showStatistics}
    </div>
  )
}

export default App
