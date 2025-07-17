const Login = ({handleLogin, username, password, setUsername, setPassword}) => {
	return (
		<>
		<form onSubmit={(event) => handleLogin(event, username, password)}>
			<div>
			username: 
			<input
				type="text"
				value={username}
				name="Username"
				onChange={({target}) => setUsername(target.value)}
				/>
			</div>
			<div>
			password: 
			<input
				type="text"
				value={password}
				name="Password"
				onChange={({target}) => setPassword(target.value)}
				/>
			</div>
			<div>
			<button type="submit">login</button>
			</div>
		</form>
		</>
	);
};

export default Login;
