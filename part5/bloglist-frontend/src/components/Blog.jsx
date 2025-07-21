import { useState } from 'react'
import blogService from '../services/blogs'
import './blog.css'

const Blog = ({ blog, onLike, onDelete }) => {
	const [visible, setVisible] = useState(false)
	const [likes, setLikes] = useState(blog.likes)

	const infoHidden = { display: `${visible ? '' : 'none'}` }
	// const infoShow = { display: `${visible ? 'none' : ''}` }

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	const handleLike = async (blog) => {
		const newLikes = likes + 1
		setLikes(newLikes)
		blog.likes = newLikes

		await blogService.update(blog)
		await onLike()
	}

	return (
		<div className="blogContainer">
			<div>
				{blog.title}
				<button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
			</div>
			<div style={infoHidden}>
				<div>
					{blog.url}
				</div>
				<div>
					likes: {blog.likes}
					<button onClick={() => handleLike(blog)}>like</button>
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
