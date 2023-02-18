import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin, username, setUsername, password, setPassword }) => {

    return (
        <div>
            <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
            <div>
                Username
                <input
                    id = "username"
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                Password
                <input
                    id = "password"
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button
                type="submit">Login</button>
        </form>
    </div>
    )
}

LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    setUsername: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
    password: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
}
export default LoginForm