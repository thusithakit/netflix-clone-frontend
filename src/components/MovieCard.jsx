import React from 'react'
import { useNavigate } from 'react-router-dom';

function MovieCard(props) {
    const navigate = useNavigate();
    function navigateToDetailPage(contentId) {
        navigate(`/movies/${contentId}`);
    }
    return (
        <div className="movie-item" onClick={() => navigateToDetailPage(props.id)}>
            <img src={props.posterUrl} alt={props.title} />
            <h2>{props.title}</h2>
            <p>{props.genre} | {props.releaseYear}</p>
        </div>
    )
}

export default MovieCard
