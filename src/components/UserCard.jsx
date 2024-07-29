import React from 'react'
import api from '../api/auth'

function UserCard({ user, deleteSelectedUser }) {

    function deleteUser() {
        deleteSelectedUser(user.id)
    }

    return (
        <div className='userCard'>
            <div>
                <h3>Username : {user.username}</h3>
                <p>Fullname : {user.first_name} {user.last_name}</p>
            </div>
            <button onClick={deleteUser}>Remove User</button>
        </div>
    )
}

export default UserCard
