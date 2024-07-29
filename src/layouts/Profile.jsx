import React, { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext';
import api from '../api/auth';
import Loading from '../components/Loading';

function Profile() {
    const { user } = useContext(UserContext);
    const [firstName, setFirstName] = useState(user.first_name);
    const [lastName, setLastName] = useState(user.last_name);
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState(user.password);
    const [isLoading, setIsLoading] = useState(false);
    async function handleUpdateUser() {
        try {
            setIsLoading(true);
            const response = await api.put('/user/updateProfile', {
                id: user.id,
                first_name: firstName,
                last_name: lastName,
                username: username,
                email: email,
                password: password,
                role: user.role
            })
            console.log(response.data);
            history.back('/')
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
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
    if (isLoading) {
        return <Loading />
    }
    return (
        <section className="profile">
            <div className="container">
                <h2>Edit Profile Details</h2>
                <div className="flex">
                    <div>
                        <label htmlFor="editFName">First Name</label>
                        <input type="text" name="editFName" id="editFName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="editLName">Last Name</label>
                        <input type="text" name="editLName" id="editLName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="editUName">Username</label>
                        <input type="text" name="editUName" id="editUName" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="editEMail">Email</label>
                        <input type="email" name="editEMail" id="editEMail" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="editPassword">Password</label>
                        <input type="password" name="editPassword" id="editPassword" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </div>
                <button onClick={handleUpdateUser}>Update Profile</button>
            </div>
        </section>
        // <div>
        //     <input type="text" name="editFName" id="editFName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        //     <input type="text" name="editLName" id="editLName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        //     <input type="text" name="editUName" id="editUName" value={username} onChange={(e) => setUsername(e.target.value)} />
        //     <input type="email" name="editEMail" id="editEMail" value={email} onChange={(e) => setEmail(e.target.value)} />
        //     <input type="password" name="editPassword" id="editPassword" value={password} onChange={(e) => setPassword(e.target.value)} />
        //     <button onClick={handleUpdateUser}>Update</button>
        // </div>
    )
}

export default Profile;
