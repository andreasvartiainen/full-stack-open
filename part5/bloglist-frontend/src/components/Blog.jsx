import { useState } from 'react'
import blogService from '../services/blogs'
import './blog.css'

const Blog = ({ blog, onLike, onDelete }) => {
	const [visible, setVisible] = useState(false)

	const infoHidden = { display: `${visible ? '' : 'none'}` }
	// const infoShow = { display: `${visible ? 'none' : ''}` }

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	return (
		<div className="blog">
			<div>
				{blog.title} - {blog.author}
				<button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
			</div>
			<div style={infoHidden}>
				<div>
					{blog.url}
				</div>
				<div>
					likes: {blog.likes}
					<button onClick={() => onLike(blog)}>like</button>
				</div>
				<div>
					{blog.author}
				</div>
				<button onClick={() => { onDelete(blog) }}>delete</button>
			</div>
		</div>
	)
}

export default Blog
