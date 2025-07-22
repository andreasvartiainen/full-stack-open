import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlog from './AddBlog'

test('<AddBlog /> calls event handler with the right details', async () => {
	const createBlog = vi.fn()
	const user = userEvent.setup()

	render(<NewBlog createBlog={createBlog} />)

	// const inputs = screen.getAllByRole('textbox')
	const titleInput = screen.getByPlaceholderText('add title')
	const authorInput = screen.getByPlaceholderText('add author')
	const urlInput = screen.getByPlaceholderText('add url')
	const submitButton = screen.getByText('create')

	await user.type(titleInput, 'testing a blog')
	await user.type(authorInput, 'Test Author')
	await user.type(urlInput, 'www.test.fi')
	await user.click(submitButton)

	expect(createBlog.mock.calls).toHaveLength(1)
	expect(createBlog.mock.calls[0][1].title).toBe( 'testing a blog')
	expect(createBlog.mock.calls[0][1].author).toBe( 'Test Author')
	expect(createBlog.mock.calls[0][1].url).toBe( 'www.test.fi')
})

