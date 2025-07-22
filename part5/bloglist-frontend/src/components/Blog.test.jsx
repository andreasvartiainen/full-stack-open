import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
	title: 'Title of a test blog',
	author: 'Test Author',
	url: 'www.test.com',
}


test('renders content', () => {
	render(<Blog blog={blog} />)

	// screen.debug()

	const element = screen.getByText('Title of a test blog', { exact: false })
	expect(element).toBeDefined()
})

test('author and title shown as default', () => {
	render(<Blog blog={blog} />)

	const element = screen.getByText('Title of a test blog - Test Author')
	expect(element).toBeDefined()
})

test('clicking the button shows url and number of likes', async () => {
	render(<Blog blog={blog} />)

	const user = userEvent.setup()
	const button = screen.getByText('view')
	user.click(button)

	const likes = screen.getByText('likes', { exact: false })
	const url = screen.getByText('www.test.com')

	expect(likes).toBeDefined()
	expect(url).toBeDefined()
})

test('clicking the like button twice', async () => {
	const mockHandler = vi.fn()

	render(<Blog blog={blog} onLike={mockHandler} />)

	// don't forget await you doofus
	const user = userEvent.setup()
	const button = screen.getByText('view')
	await user.click(button)

	const likeButton = screen.getByText('like')
	await user.click(likeButton)
	await user.click(likeButton)

	expect(mockHandler.mock.calls).toHaveLength(2)
})

test('clicking the button calls event handler once', async () => {
	const mockHandler = vi.fn()

	render(
		<Blog blog={blog} onDelete={mockHandler}/>
	)

	const user = userEvent.setup()
	const button = screen.getByText('delete')
	await user.click(button)

	expect(mockHandler.mock.calls).toHaveLength(1)

})
