import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import api from '../api/auth';
import ReviewCard from '../components/ReviewCard';
import { UserContext } from '../context/UserContext';
import { FaStar } from 'react-icons/fa';
import Loading from '../components/Loading';

function DetailPage() {
    const { contentId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [content, setContent] = useState(null);
    const [reviews, setReviews] = useState(null);
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(1);
    const { user } = useContext(UserContext);
    const [error, setError] = useState(null);

    const fetchReviews = async () => {
        try {
            setIsLoading(true);
            const response = await api.get(`/reviews/getreviews/${contentId}`);
            if (response.data) {
                setReviews(response.data);
            }
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
    useEffect(() => {
        const fetchMovieData = async () => {
            try {
                setIsLoading(true);
                const response = await api.get(`/content/getContentById/${contentId}`)
                setContent(response.data);
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
        fetchMovieData();
        fetchReviews();
    }, [contentId]);
    const fetchReview = async () => {
        try {
            setIsLoading(true)
            const response = await api.post('/reviews/saveReview', {
                userId: user.id,
                movieId: contentId,
                rating: rating,
                content: comment
            })
            setIsLoading(false);
            fetchReviews();

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
    function addReview() {
        if (comment.length > 0) {
            fetchReview();
            setComment("");
            setRating(1);
        } else {
            setError("Review can't be empty!")
        }

    }
    // if (isLoading) {
    //     return <Loading />
    // }
    return (
        <>
            {content && (
                <section className='detail-page'>
                    <div className="container">
                        <h1>{content.title}</h1>
                        <p>{content.genre} | {content.releaseYear}</p>

                        <iframe src={content.embedUrl}></iframe>
                        <div className="reviews">
                            <div className="add-comment">
                                <div className="rating">
                                    {[...Array(5)].map((_, index) => {
                                        index += 1;
                                        return (
                                            <FaStar onClick={() => setRating(index)} key={index} className={index <= rating ? "active" : "inactive"} size={40} />
                                        )
                                    })}
                                </div>
                                <textarea rows="4" name="comment" value={comment} id="comment" onChange={(e) => setComment(e.target.value)} />
                                <button onClick={addReview}>Add Review</button>
                            </div>
                            {reviews && reviews.length > 0 && (
                                reviews.map(review => (
                                    <ReviewCard key={review.id} id={review.id} rating={review.rating} content={review.content} ratedUser={review.userId} fetchReviews={fetchReviews} />
                                ))
                            )}
                        </div>
                    </div>
                </section>
            )}
        </>
    )
}

export default DetailPage
