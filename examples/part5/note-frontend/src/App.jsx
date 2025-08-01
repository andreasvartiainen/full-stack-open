import { useState, useEffect, useRef, useImperativeHandle } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import noteService from './services/notes'
import loginService from './services/login'
import LoginFrom from './components/login'
import NoteForm from './components/noteForm'
import Togglable from './components/togglable'

const App = () => {
	const [loginVisible, setLoginVisible] = useState(false);
	const [notes, setNotes] = useState([])
	const [showAll, setShowAll] = useState(true)
	const [errorMessage, setErrorMessage] = useState(null)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)
	const noteFormRef = useRef();

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			noteService.setToken(user.token)
		}
	}, [])

	useEffect(() => {
		noteService
			.getAll()
			.then(initialNotes => {
				setNotes(initialNotes)
			})
	}, [])

	const createNote = (noteObject) => {
		noteFormRef.current.toggleVisibility();
		noteService
			.create(noteObject)
			.then(returnedNote => {
				setNotes(notes.concat(returnedNote))
			})

	}

	const toggleImportanceOf = id => {
		const note = notes.find(n => n.id === id)
		const changedNote = { ...note, important: !note.important }

		noteService
			.update(id, changedNote)
			.then(returnedNote => {
				setNotes(notes.map(note => note.id !== id ? note : returnedNote))
			})
			.catch(() => {
				setErrorMessage(
					`Note '${note.content}' was already removed from server`
				)
				setTimeout(() => {
					setErrorMessage(null)
				}, 5000)
			})
	}

	const handleLogin = async (event) => {
		event.preventDefault()

		try {
			const user = await loginService.login({
				username, password,
			})
			window.localStorage.setItem(
				'loggedNoteappUser', JSON.stringify(user)
			)
			noteService.setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')
		} catch (exception) {
			setErrorMessage('wrong credentials')
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		}
	}

	const notesToShow = showAll
		? notes
		: notes.filter(note => note.important)

	const loginForm = () => {
		const hideWhenVisible = { display: loginVisible ? 'none' : '' };
		const showWhenVisible = { display: loginVisible ? '' : 'none' };

		return (
			<div>
				<div style={hideWhenVisible}>
					<button onClick={() => setLoginVisible(true)}>log in</button>
				</div>
				<div style={showWhenVisible}>
					<LoginFrom
						username={username}
						password={password}
						handleUsernameChange={({ target }) => setUsername(target.value)}
						handlePasswordChange={({ target }) => setPassword(target.value)}
						handleSubmit={handleLogin} />
					<button onClick={() => setLoginVisible(false)}>cancel</button>
				</div>
			</div>
		);
	}

	const noteForm = () => (
			<Togglable buttonLabel="new note" ref={noteFormRef}>
					<NoteForm
						createNote={createNote}
					/>
				</Togglable>
	)

	return (
		<div>
			<h1>Notes</h1>
			<Notification message={errorMessage} />

			{!user && loginForm()}
			{user && <div>
				<p>{user.name} logged in</p>
					{noteForm()}
				</div>
			}

			<div>
				<button onClick={() => setShowAll(!showAll)}>
					show {showAll ? 'important' : 'all'}
				</button>
			</div>
			<ul>
				{notesToShow.map(note =>
					<Note
						key={note.id}
						note={note}
						toggleImportance={() => toggleImportanceOf(note.id)}
					/>
				)}
			</ul>
			<Footer />
		</div>
	)
}

export default App;
