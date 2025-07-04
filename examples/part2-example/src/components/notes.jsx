import axios from "axios";
import { useEffect, useState } from "react";

const FILTER_LIST = [
	(note) => note.important,
	() => true,
];

const Note = ({note}) => {
	return (
		<li>{note.content}</li>
	)
}

const Notes = () => {
	const [notes, setNotes] = useState([]);
	const [newNote, setNewNote] = useState('');
	const [showAll, setShowAll] = useState(true);


	const hook = () => {
		console.log("effect");
		axios
			.get('http://localhost:3002/notes')
			.then(response => {
			console.log("promise fullfilled");
			setNotes(response.data);
		});
	};

	useEffect(hook, []);

	console.log('render', notes.length, 'notes');

	// unary + turns boolean to 1 or 0
	const noteList = notes.filter(FILTER_LIST[+showAll]).map(note => <Note key={note.id} note={note}/>);

	const addNote = (event) => {
		event.preventDefault();
		console.log('button clicked' , event.target);
		console.log(event.target.name);
		const noteObject =  {
			content: newNote,
			important: Math.random() < 0.5,
			id: String(notes.length + 1),
		};
		setNotes([...notes, noteObject]);
		setNewNote('');
	}

	const handleNoteChange = (event) => {
		console.log(event.target.value);
		setNewNote(event.target.value);
	}

	// const notesToShow = showAll
	// 	? notes
	// 	: notes.filter(note => note.important)

 return (
		<>
		<h1>Notes</h1>
		<ul>
		 {noteList}
		<form name="form" onSubmit={addNote}>
			<input name="note" placeholder="new note" value={newNote} onChange={handleNoteChange}/>
			<button type="submit">save</button>
		</form>
		<button onClick={() => setShowAll(!showAll)}>
		{showAll ? 'important' : 'all'}
		</button>
		</ul>
		</>
  )

}

export default Notes;
