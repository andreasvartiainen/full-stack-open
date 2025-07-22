import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable'

describe('<Togglable />', () => {
	let container

	beforeEach(() => {
		container = render(
			<Togglable buttonLabel="show...">
				<div className='testDiv'>
					content to show
				</div>
			</Togglable>
		).container
	})

	test('renders its children', async () => {
		await screen.findAllByText('content to show')
	})

	test('at start children are hidden', () => {
		const div = container.querySelector('.togglableContent')
		expect(div).toHaveStyle('display: none')
	})

	test('after clicking the button, display children', async () => {
		const user = userEvent.setup()
		const button = screen.getByText('show...')
		await user.click(button)

		const div = container.querySelector('.togglableContent')
		expect(div).not.toHaveStyle('display: none')
	})

	test('content can be hidden by pressing cancel', async () => {
		const user = userEvent.setup()
		const button = screen.getByText('show...')
		await user.click(button)

		const cancelButton = screen.getByText('cancel')
		await user.click(cancelButton)

		const div = container.querySelector('.togglableContent')
		expect(div).toHaveStyle('display: none')
	})
})

