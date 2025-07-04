import axios from "axios";
import Notes from "./components/notes"
import { useEffect, useState } from "react";

function App() {
	const [notes, setNotes] = useState([]);

	const hook = () => {
		console.log("effect");
		axios
			.get('http://localhost:3001/notes')
			.then(response => {
			console.log("promise fullfilled");
			setNotes(response.data);
		});
	};

	useEffect(hook, []);

	console.log('render', notes.length, 'notes');

	return (
	<>
	<Notes notes={notes}/>
	</>)
 }

export default App
