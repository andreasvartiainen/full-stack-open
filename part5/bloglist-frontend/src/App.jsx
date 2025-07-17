import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import login from './services/login';
import AddBlog from './components/AddBlog';
import Error from './components/Error';

const App = () => {
  const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);
	const [error, setError] = useState(null);

  useEffect(() => {
		if (user) {
			blogService.getAll().then(blogs =>
				setBlogs( blogs )
			)  
		}
  }, [user])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			blogService.setToken(user.token);
		}
	}, [])

	const handleError = (text) => {
		setError(text);
		setTimeout(() => {
			setError(null);
		}, 5000);
		
	}

	const handleLogin = async (event) => {
		event.preventDefault();

		try {
			const user = await login({username, password});
			blogService.setToken(user.token);

			window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));

			setUser(user);
			setUsername('');
			setPassword('');
		} catch (exception) {
			handleError(exception.response.data.error);
		}
	};

	const handleLogout = () => {
		blogService.setToken(null);
		window.localStorage.clear();
		setUser(null);
	}

	const createBlog = async (event, blog) => {
		event.preventDefault();

		try {
			await blogService.create(blog);
			const currentBlogs = await blogService.getAll();
			handleError(`a new blog ${blog.title} by ${blog.author} added`);
			setBlogs(currentBlogs);
		} catch(exception) {
			console.log(exception);
		}
	}

	const loginForm = () => 
		<form onSubmit={handleLogin}>
			<div>
			username:
			<input
				type='text'
				name="Username"
				value={username}
				onChange={({target}) => setUsername(target.value)}/>
			</div>
			<div>
			password:
			<input
				type='text'
				name="Password"
				value={password}
				onChange={({target}) => setPassword(target.value)}/>
			</div>
			<div>
			<button type="submit">Login</button>
			</div>
		</form>
	
	const noteForm = () => 
		<div>
      {blogs.map(blog => {
					return <Blog key={blog.id} blog={blog} />
			})}
		</div>

  return (
    <div>
      <h2>blogs</h2>
			{ error === null ?
				null :
				<Error text={error}/>
			}
			{ user === null ?
				loginForm() :
				<div>
				{user.name} logged in
				<button onClick={handleLogout}>Logout</button>
				<h2>create new</h2>
				<AddBlog createBlog={createBlog}/>
				<div>
				{noteForm()}
				</div>
				</div>
			}
    </div>
  )
}

export default App
