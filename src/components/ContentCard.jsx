import React, { useState } from 'react'
import api from '../api/auth';

function ContentCard({ content, handleDeleteContent }) {
    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState(content.title);
    const [release, setRelease] = useState(content.releaseYear);
    const [genre, setGenre] = useState(content.genre);
    const [type, setType] = useState(content.type);
    const [posterUrl, sePosterUrl] = useState(content.posterUrl);
    const [embedUrl, setEmbedUrl] = useState(content.embedUrl);
    const [edit, setEdit] = useState(false);
    function deleteContent() {
        handleDeleteContent(content.id);
    }
    function handleEdit() {
        setEdit(true);
    }
    function updateContent() {
        const fetchUpdateContent = async () => {
            try {
                setIsLoading(true)
                const response = await api.put('/content/updateContent', {
                    id: content.id,
                    title: title,
                    releaseYear: release,
                    genre: genre,
                    type: type,
                    posterUrl: posterUrl,
                    embedUrl: embedUrl
                })
                console.log(response.data);
                setIsLoading(false)
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
        fetchUpdateContent();
        setEdit(false);
    }
    return (
        <div className='content-card'>
            <div className="flex">
                <div>
                    <h3>{title}</h3>
                    <p>{release}</p>
                </div>
                <div>
                    <button disabled={edit} onClick={handleEdit}>Edit</button>
                    <button onClick={deleteContent}>Delete</button>
                </div>
            </div>
            {edit && (
                <div className="form">
                    <div>
                        <label htmlFor='title'>Title</label>
                        <input id='title' type="text" placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="release">Release Year</label>
                        <input id='release' type="number" min="1900" placeholder='Release Date' value={release} onChange={(e) => setRelease(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="genre">Genre</label>
                        <input id='genre' type="text" placeholder='Genre' value={genre} onChange={(e) => setGenre(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="content Type">Content Type</label>
                        <select name="contentType" id="contentType" value={type} onChange={(e) => setType(e.target.value)}>
                            <option value="movie">Movie</option>
                            <option value="tvSeries">TV Series</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="poster">Poster URL</label>
                        <input id='poster' type="text" placeholder='Poster Url' value={posterUrl} onChange={(e) => sePosterUrl(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="embed">Embed URL</label>
                        <input id='embed' type="text" placeholder='Embed Url' value={embedUrl} onChange={(e) => setEmbedUrl(e.target.value)} />
                    </div>
                    <button onClick={updateContent}>Update</button>
                </div>
            )}
        </div>
    )
}

export default ContentCard
