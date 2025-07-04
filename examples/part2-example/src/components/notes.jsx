import axios from "axios";
import { useEffect, useState } from "react";
import noteService from "../services/services"

const FILTER_LIST = [
	(note) => note.important,
	() => true,
];

const Note = ({note, toggleImportant}) => {
	const label = note.important
	? 'make not important': 'make important';
	return (
		<li>{note.content}
		<button onClick={() => toggleImportant(note.id)}>{label}</button>
		</li>
	)
}

const Notes = () => {
	const [notes, setNotes] = useState([]);
	const [newNote, setNewNote] = useState('');
	const [showAll, setShowAll] = useState(true);


	const hook = () => {
		noteService
			.getAll()
			.then(initialNotes => {
			setNotes(initialNotes);
		}).catch((error) => {
			console.log(error);
		});
	};
	useEffect(hook, []);


	const addNote = (event) => {
		event.preventDefault();
		const noteObject =  {
			content: newNote,
			important: Math.random() < 0.5,
		};

		noteService
			.create(noteObject)
			.then(initialNote => {
				setNotes([...notes, initialNote]);
				setNewNote('');
		})
	}

	const toggleImportanceOf = (id) => {
		const url = `http://localhost:3002/notes/${id}`;
		const note = notes.find(n => n.id === id);
		const changedNote = {...note, important: !note.important};

		noteService.update(id, changedNote)
			.then(initialNote => {
				setNotes(notes.map(note => note.id === id ? initialNote : note))
			})
		.catch((error) => {
			alert(`the note '${note.content}' was already deleted from server`);
			console.log(error);
			setNotes(notes.filter(n => n.id !== id));
		})
	}
	const handleNoteChange = (event) => {
		// console.log(event.target.value);
		setNewNote(event.target.value);
	}

	// unary + turns boolean to 1 or 0
	const noteList = notes
		.filter(FILTER_LIST[+showAll])
		.map(note => <Note key={note.id} note={note} toggleImportant={toggleImportanceOf}/>);

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
