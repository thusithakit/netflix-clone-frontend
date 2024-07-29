import React, { useEffect, useState } from 'react'
import api from '../api/auth';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';

export default function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function handleFirstName(event) {
        setFirstName(event.target.value)
    }
    function handleLastName(event) {
        setLastName(event.target.value)
    }
    function handleUsername(event) {
        setUsername(event.target.value)
    }
    function handleEmail(event) {
        setEmail(event.target.value)
    }
    function handlePassword(event) {
        setPassword(event.target.value)
    }

    const fetchHandleUserRegister = async () => {
        try {
            setLoading(true);
            const response = await api.post('/user/register', {
                first_name: firstName,
                last_name: lastname,
                username: username,
                email: email,
                password: password,
                role: "user"
            })
            console.log(response.data);
            if (response.status == 200) {
                setFirstName("");
                setLastName("");
                setUsername("");
                setEmail("");
                setPassword("");
                navigate('/login')
            }
            setLoading(false);
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
    function registerUser() {
        if (firstName.length > 0 && lastname.length > 0 && username.length > 0 && email.length > 0 && password.length > 0) {
            fetchHandleUserRegister();
        } else {
            setError("Please fill all the required fields")
        }
    }
    function navigateToLogin() {
        navigate('/login')
    }
    if (loading) {
        return <Loading />
    }
    return (
        <section className="register">
            <div className="register-container">
                <h2>Register</h2>
                <div className="flex">
                    <input required type="text" name="firstname" id="firstname" onChange={handleFirstName} value={firstName} placeholder='First Name' />
                    <input type="text" name="lastname" id="lastname" onChange={handleLastName} value={lastname} placeholder='Last Name' />
                </div>
                <input required type="text" name="username" id="username" onChange={handleUsername} value={username} placeholder='Username' />
                <input required type="email" name="email" id="email" onChange={handleEmail} value={email} placeholder='Email' />
                <input required type="password" name="password" id="password" onChange={handlePassword} value={password} placeholder='password' />
                <button onClick={registerUser}>Register Now !</button>
                <p className='register-text'>Already have an account? <span onClick={navigateToLogin}>Login Now</span></p>
            </div>
        </section>
    )
}
