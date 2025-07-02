import { useState } from 'react'

const Button = ({text, onClick}) => {
	return (
		<button onClick={onClick}>{text}</button>
	)
}

const Anecdote = ({anecdotes, votes, index}) => {
	return (
		<>
		<div> {anecdotes[index]} </div>
		<div>Has {votes[index]} Votes</div>
		</>
	)
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0);
	const [mostVoted, setMost] = useState(0);
	const [votes, setVotes] = useState(Array(8).fill(0));

	const setRandom = () => {
		const randomNumber = Math.round(Math.random() * 100) % anecdotes.length;
		console.log(randomNumber);
		setSelected(randomNumber);
	}

	const vote = () => {
		const newVotes = [...votes];
		newVotes[selected] += 1;
		setVotes(newVotes);

		let max = 0;
		let maxIndex = 0;
		newVotes.forEach((vote, index) => {
			if (vote > max)
			{
				max = vote;
				maxIndex = index;
			}
		})
		setMost(maxIndex);
	}

  return (
    <div>
		<h1>Anecdote of the day</h1>
		<Anecdote anecdotes={anecdotes} votes={votes} index={selected}/>
		<Button onClick={vote} text={"vote"}/>
		<Button onClick={setRandom} text={"next anecdote"}/>

		<h1>Anecdote with most votes</h1>
		<Anecdote anecdotes={anecdotes} votes={votes} index={mostVoted}/>
		
    </div>
  )
}

export default App
