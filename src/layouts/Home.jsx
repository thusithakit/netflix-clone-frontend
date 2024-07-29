import React, { useContext, useEffect, useState } from 'react'
import api from '../api/auth';
import { useNavigate } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import NavigationBar from '../components/NavigationBar';
import { UserContext } from '../context/UserContext';
import Loading from '../components/Loading';
function Home() {
    const [loading, setLoading] = useState(true);
    const [contents, setContents] = useState([]);
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    useEffect(() => {
        const fetchContent = async () => {
            try {
                setLoading(true);
                const response = await api.get('/content/getAllContent');
                setContents(response.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else {
                    console.log(`Error: ${error.message}`)
                }
            }
        }
        fetchContent();
    }, [])
    if (loading) {
        return <Loading />
    }
    function navigateToDetailPage(contentId) {
        navigate(`/movies/${contentId}`);
    }
    const latestContent = contents[contents.length - 1];
    const backgroundStyle = {
        backgroundImage: `linear-gradient(45deg,black,rgb(0 0 0 / 20%)),url(${latestContent.posterUrl})`
    }
    return (
        <>
            <NavigationBar user={user} />
            <section className="homepage">
                <div className="latest-content" style={backgroundStyle}>
                    <div className="container">
                        <h2>New this week</h2>
                        <h1>{latestContent.title}</h1>
                        <p>{latestContent.genre} | {latestContent.releaseYear}</p>
                        <button onClick={() => navigateToDetailPage(latestContent.id)}>Watch Now</button>
                    </div>
                </div>
                <div className="container">
                    {contents && contents.length > 0 && (
                        <div className='movies'>
                            <h2>Browse Through Thousands of Movies and TV Shows</h2>
                            <div className="movies-list">
                                {contents.map((content) => (
                                    <MovieCard key={content.id} id={content.id}
                                        posterUrl={content.posterUrl} title={content.title}
                                        genre={content.genre} releaseYear={content.releaseYear}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>

        </>
    )
}

export default Home
