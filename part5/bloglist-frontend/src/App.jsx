import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import login from './services/login'
import NewBlog from './components/AddBlog'
import Error from './components/Error'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)
	const [error, setError] = useState(null)
	const toggleRef = useRef()

	useEffect(() => {
		if (user) {
			blogService.getAll().then(blogs => {
				// sorting the blogs by likes
				const sortedBlogs = blogs.sort((a, b) => a.likes < b.likes)
				setBlogs(sortedBlogs)
			}
			)
		}
	}, [user])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const handleError = (text) => {
		setError(text)
		setTimeout(() => {
			setError(null)
		}, 5000)

	}

	const handleLogin = async (event) => {
		event.preventDefault()

		try {
			const user = await login({ username, password })
			blogService.setToken(user.token)

			window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

			setUser(user)
			setUsername('')
			setPassword('')
		} catch (exception) {
			handleError(exception.response.data.error)
		}
	}

	const handleLogout = () => {
		blogService.setToken(null)
		window.localStorage.clear()
		setUser(null)
	}

	const createBlog = async (event, blog) => {
		event.preventDefault()

		try {
			await blogService.create(blog)
			const currentBlogs = await blogService.getAll()
			handleError(`a new blog ${blog.title} by ${blog.author} added`)
			setBlogs(currentBlogs)
		} catch (exception) {
			console.log(exception)
		}

		toggleRef.current.toggleVisibility()
	}

	const sort = () => {
		const sortedBlogs = [...blogs]
		sortedBlogs.sort((a, b) => a.likes < b.likes)
		setBlogs(sortedBlogs)
	}

	const removeBlog = (blog) => {
		const accept = window.confirm(`remove blog ${blog.title}`)
		if (accept) {
			blogService.remove(blog.id)
			setBlogs(blogs.filter(b => b.id !== blog.id))
		}
	}

	const noteForm = () =>
		<div>
			{blogs.map(blog => {
				return <Blog key={blog.id} blog={blog} onLike={sort} onDelete={removeBlog} />
			})}
		</div>

	const handleUsernameChange = (target) => {
		setUsername(target.value)
	}

	const handlePasswordChange = (target) => {
		setPassword(target.value)
	}

	return (
		<div>
			<h2>blogs</h2>
			{error === null ?
				null :
				<Error text={error} />
			}
			{user === null ?
				<LoginForm
					handleLogin={handleLogin}
					handleUsernameChange={handleUsernameChange}
					handlePasswordChange={handlePasswordChange}
					username={username}
					password={password}
				/> :
				<div>
					{user.name} logged in
					<button onClick={handleLogout}>Logout</button>
					<h2>create new</h2>
					<Togglable buttonLabel="New Note" ref={toggleRef}>
						<NewBlog createBlog={createBlog} />
					</Togglable>
					<div>
						{noteForm()}
					</div>
				</div>
			}
		</div>
	)
}

export default App
