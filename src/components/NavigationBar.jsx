import React, { useEffect, useState } from 'react'
import logo from '../assets/images/logo.png';
import profileIcon from '../assets/images/profile-icon.png';
import api from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";

function NavigationBar({ user }) {
    const [title, setTitle] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [contents, setContents] = useState([]);
    const navigate = useNavigate();
    function handleSearch(e) {
        setTitle(e.target.value);
    }
    function handleProfileDetails() {
        navigate('/profile')
    }
    function navigateToDetailPage(contentId) {
        navigate(`/movies/${contentId}`);
    }
    function navigateToAdmin() {
        navigate('/admin');
    }
    useEffect(() => {
        const searchMovie = async () => {
            try {
                setIsLoading(true);
                console.log(title)
                if (title && title.length > 0) {
                    const response = await api.get(`/content/getAllContentsByTitle/${title}`)
                    setContents(response.data);
                } else if (title.length == 0) {
                    setContents([]);
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
        searchMovie();
    }, [title])
    return (
        <header>
            <div className="container">
                <img src={logo} alt="" className='logo' />
                <div className="search">
                    {user.role === "admin" && <button onClick={navigateToAdmin}>Go to Admin Panel</button>}
                    <div className="field">
                        <input type="text" name="search bar" id="search" onChange={handleSearch} value={title} placeholder='Looking for something?' />
                        {
                            contents && contents.length > 0 && (
                                <ul className="suggestions">
                                    {
                                        contents.map((content) => (
                                            <li className="suggest" onClick={() => navigateToDetailPage(content.id)} key={content.id}>{content.title}</li>
                                        ))
                                    }
                                </ul>
                            )
                        }
                    </div>
                    {/* <img className='profile' src={profileIcon} onClick={handleProfileDetails} alt="" /> */}
                    <CgProfile className='profile' onClick={handleProfileDetails} size={40} color='#fff' />
                </div>
            </div>
        </header>
    )
}

export default NavigationBar;
