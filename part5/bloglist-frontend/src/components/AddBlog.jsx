import { useState } from 'react'

const NewBlog = ({ createBlog }) => {
	const [blog, setBlog] = useState({ title: '', author: '', url: '' })

	const handleChange = ({ target }) => {
		switch (target.name) {
		case 'Title': {
			const newBlog = { ...blog, title: target.value }
			setBlog(newBlog)
			return
		}
		case 'Author': {
			const newBlog = { ...blog, author: target.value }
			setBlog(newBlog)
			return
		}
		case 'Url': {
			const newBlog = { ...blog, url: target.value }
			setBlog(newBlog)
			return
		}
		}
	}

	return (
		<form onSubmit={(event) => {
			createBlog(event, blog)
			setBlog({ title: '', author: '', url: '' })
		}}>
			<div>
				Title:
				<input
					type="text"
					name="Title"
					value={blog.title}
					onChange={handleChange} />
			</div>
			<div>
				Author:
				<input
					type="text"
					name="Author"
					value={blog.author}
					onChange={handleChange} />
			</div>
			<div>
				Url:
				<input
					type="text"
					name="Url"
					value={blog.url}
					onChange={handleChange} />
			</div>
			<div>
				<button type="submit">create</button>
			</div>
		</form>
	)
}

export default NewBlog
