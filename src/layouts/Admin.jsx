import React, { useEffect, useState } from 'react'
import api from '../api/auth';
import ContentCard from '../components/ContentCard';
import UserCard from '../components/UserCard';
import AddContent from '../components/AddContent';
import Loading from '../components/Loading';

function Admin() {
    const [isLoading, setIsLoading] = useState(false);
    const [showContents, setShowContents] = useState(true);
    const [showUsers, setShowUsers] = useState(false);
    const [contents, setContents] = useState([]);
    const [users, setUsers] = useState([]);
    const [addContent, setAddContent] = useState(false);

    function handleshowContents() {
        setShowContents(true)
        setShowUsers(false)
    }
    function handleshowUsers() {
        setShowContents(false);
        setShowUsers(true);
    }

    useEffect(() => {
        const fetchContents = async () => {
            try {
                setIsLoading(true);
                const response = await api.get('/content/getAllContent')
                setContents(response.data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else {
                    console.log(`Error: ${error.message}`)
                }
            }
        }
        const fetchUsers = async () => {
            try {
                setIsLoading(true);
                const response = await api.get('/user/getAllUsers')
                setUsers(response.data);
                setIsLoading(false);

            } catch (error) {
                setIsLoading(false);
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else {
                    console.log(`Error: ${error.message}`)
                }
            }
        }
        fetchContents();
        fetchUsers();
    }, [showContents, showUsers, addContent])
    async function handleDeleteUser(userId) {
        try {
            const response = await api.delete(`/user/deleteUser/${userId}`);
            console.log(response.data);
            setUsers(users.filter(user => user.id !== userId));
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else {
                console.log(`Error: ${error.message}`)
            }
        }
    }
    async function handleDeleteContent(contentId) {
        try {
            const response = await api.delete(`/content/deleteContent/${contentId}`);
            console.log(response.data);
            setContents(contents.filter(content => content.id !== contentId));
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else {
                console.log(`Error: ${error.message}`)
            }
        }
    }
    function handleAddContent() {
        setAddContent(true);
    }
    if (isLoading) {
        return <Loading />
    }
    return (
        <section className="admin-section">
            <div className="container">
                <h2>Admin Panel</h2>
                <div className="selects">
                    <button onClick={handleshowContents} className={showContents ? "active" : "disable"}>Manage Content</button>
                    <button onClick={handleshowUsers} className={showUsers ? "active" : "disable"}>Manage Users</button>
                </div>

                {showContents && <button onClick={handleAddContent} className='addContent-btn'>Add Content</button>}
                {showContents && addContent && (
                    <AddContent setAddContent={setAddContent} />
                )}

                {showContents && contents.length > 0 && (
                    contents.map((content) => (
                        <ContentCard key={content.id} content={content} handleDeleteContent={handleDeleteContent} />
                    ))
                )}
                {showUsers && users.length > 0 && (
                    users.map((user) => (
                        <UserCard key={user.id} user={user} deleteSelectedUser={handleDeleteUser} />
                    ))
                )}
            </div>
        </section>
    )
}

export default Admin
