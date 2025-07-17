import { useEffect, useState } from "react";
import noteService from "../services/services"
import Notification from "./notification";
import Login from "./login";
import login from "../services/login";

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
	const [errorMessage, setErrorMessage] = useState(null);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);

	useEffect(() => {
		noteService
			.getAll()
			.then(initialNotes => {
			setNotes(initialNotes);
		}).catch((error) => {
			console.log(error);
		});
	}, []);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			noteService.setToken(user.token);
		}
	}, []);


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
		}).catch( error => console.log(error.response.data.error));
	}

	const toggleImportanceOf = (id) => {
		const note = notes.find(n => n.id === id);
		const changedNote = {...note, important: !note.important};

		noteService.update(id, changedNote)
			.then(initialNote => {
				setNotes(notes.map(note => note.id === id ? initialNote : note))
			})

		.catch((error) => {
			setErrorMessage(`the note '${note.content}' was already deleted from server`);
			setTimeout(() => {
				setErrorMessage(null);
			}, 3000);

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
	
	const handleLogin = async (event) => {
		event.preventDefault();

		try {
			const user = await login({ username, password });


			window.localStorage.setItem(
				'loggedNoteappUser', JSON.stringify(user)
			)

			noteService.setToken(user.token);
			setUser(user);
			setUsername('');
			setPassword('');
		} catch (exception) {
			setErrorMessage('Wrong credentials');
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000)
		}
	};

	const loginForm = () => {
		return(
		<>
		<Login handleLogin={handleLogin}
		 username={username}
		 password={password}
		 setUsername={setUsername}
		 setPassword={setPassword}
		 />
		</>
		);
	}

	const noteForm = () => {
		return(
			<>
			<button onClick={() => setShowAll(!showAll)}>
			{showAll ? 'show important' : 'show all'}
			</button>
			<ul>
			 {noteList}
			<form name="form" onSubmit={addNote}>
				<input name="note" placeholder="new note" value={newNote} onChange={handleNoteChange}/>
				<button type="submit">save</button>
			</form>
			</ul>
			</>
		);
	};

 return (
		<>
		<h1>Notes</h1>
	 { user === null ?
		 loginForm() : 
		 <div>
		 	<p>{user.name} logged-in</p>
		 	{noteForm()}
		 </div>
	 }
	 <Notification message={errorMessage}/>
		</>
  )

}

export default Notes;
