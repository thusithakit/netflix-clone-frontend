import React, { useState, useContext } from 'react';
import api from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { UserContext } from '../context/UserContext';
import Loading from '../components/Loading';


function Login() {
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [disable, setDisable] = useState(true);
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const { login } = useAuth();

    function handleUsername(event) {
        setUsername(event.target.value);
    }
    function handlePassword(event) {
        setPassword(event.target.value);
    }
    const fetchCredentials = async () => {
        try {
            setLoading(true);
            const response = await api.post('/auth/login', {
                username: username,
                password: password
            })
            // console.log(response.data.data);
            setUser(response.data.data)
            setLoading(false);
            login();
            navigate('/home');

        } catch (error) {
            setLoading(false);
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                if (error.response.status == 401) {
                    setError("Invalid Username or Password.")
                }
            } else {
                setError(`Error: ${error.message}`);
                console.log(`Error: ${error.message}`)
            }
        }
    }
    function handleLogin() {
        setPassword("");
        fetchCredentials();
    }
    function navigateToRegister() {
        navigate('/register');
    }
    if (loading) {
        return <Loading />
    }
    return (
        <section className="login">
            <div className='login-container'>
                <h2>Sign In</h2>
                <input type="text" name="username" id="username" value={username} onChange={handleUsername} placeholder='Enter Username' />
                <input type="password" name="password" onChange={handlePassword} value={password} id="password" placeholder='Enter Password' />
                {error && <p className='error-msg'>{error}</p>}
                <button onClick={() => handleLogin()} disabled={loading}>Sign In</button>
                <p className='register-text'>Don't have an account? <span onClick={navigateToRegister}>Register Now</span></p>
            </div>
        </section>
    )
}

export default Login
