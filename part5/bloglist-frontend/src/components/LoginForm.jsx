import PropTypes from 'prop-types'

const LoginForm = ({
	handleLogin,
	handleUsernameChange,
	handlePasswordChange,
	username,
	password
}) => {
	return (
		<form onSubmit={handleLogin}>
			<div>
				username:
				<input
					type='text'
					name="Username"
					value={username}
					onChange={({ target }) => handleUsernameChange(target)} />
			</div>
			<div>
				password:
				<input
					type='password'
					name="Password"
					value={password}
					onChange={({ target }) => handlePasswordChange(target)} />
			</div>
			<div>
				<button type="submit">Login</button>
			</div>
		</form>
	)
}

LoginForm.propTypes = {
	handleLogin: PropTypes.func.isRequired,
	handleUsernameChange: PropTypes.func.isRequired,
	handlePasswordChange: PropTypes.func.isRequired,
	username: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired,
}

export default LoginForm
