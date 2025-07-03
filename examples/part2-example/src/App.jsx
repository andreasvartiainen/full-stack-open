import { useState } from "react";
import Note from "./components/note";

const FILTER_LIST = [
	(note) => note.important,
	() => true,
];

function App(props) {
	const [notes, setNotes] = useState(props.notes);
	const [newNote, setNewNote] = useState('');
	const [showAll, setShowAll] = useState(true);

	// unary + turns boolean to 1 or 0
	const noteList = notes.filter(FILTER_LIST[+showAll]).map(note => <Note key={note.id} note={note}/>);

	const addNote = (event) => {
		event.preventDefault();
		console.log('button clicked' , event.target);
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
		<form onSubmit={addNote}>
			<input placeholder="new note" value={newNote} onChange={handleNoteChange}/>
			<button type="submit">save</button>
		</form>
		<button onClick={() => setShowAll(!showAll)}>
		{showAll ? 'important' : 'all'}
		</button>
		</ul>
		</>
  )
}

export default App
