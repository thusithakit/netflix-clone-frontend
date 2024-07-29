import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext';
import api from '../api/auth';
import { FaStar } from 'react-icons/fa';

function ReviewCard({ id, rating, content, ratedUser }) {
    const { user } = useContext(UserContext);
    const deleteReview = async () => {
        try {
            const response = await api.delete(`/reviews/deleteReview/${id}`);
            console.log(response.data);
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
    return (
        <div className='published-reviews'>
            <div className="rating">
                {[...Array(5)].map((_, index) => {
                    index += 1;
                    return (
                        <FaStar key={index} className={index <= rating ? "active" : "inactive"} size={20} />
                    )
                })}
            </div>
            <p>{content}</p>
            {/* <p>{rating}</p> */}
            {(ratedUser === user.id || user.role === "admin") && (
                <button onClick={deleteReview}>Delete</button>
            )}
        </div>
    )
}

export default ReviewCard
