import React, { useState } from 'react'
import api from '../api/auth'

function AddContent({ setAddContent }) {
    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [release, setRelease] = useState("");
    const [genre, setGenre] = useState("");
    const [type, setType] = useState("");
    const [posterUrl, sePosterUrl] = useState("");
    const [embedUrl, setEmbedUrl] = useState("");

    function handleAddContent() {
        async function fetchAddContent() {
            try {
                setIsLoading(true);
                const response = await api.post('/content/saveContent', {
                    title: title,
                    releaseYear: release,
                    genre: genre,
                    type: type,
                    posterUrl: posterUrl,
                    embedUrl: embedUrl
                })
                console.log(response.data);
                setIsLoading(false);
                if (response.status == 200) {
                    setTitle("");
                    setRelease("");
                    setGenre("");
                    setType("");
                    sePosterUrl("");
                    setEmbedUrl("");
                    setAddContent(false);
                }

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
        fetchAddContent();
    }
    return (
        <div className='addContent'>
            <h1>Add Content</h1>
            <div className="grid">
                <input type="text" placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
                <input type="number" min="1900" placeholder='Release Date' value={release} onChange={(e) => setRelease(e.target.value)} />
                <input type="text" placeholder='Genre' value={genre} onChange={(e) => setGenre(e.target.value)} />
                <select name="contentType" id="contentType" value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="movie">Movie</option>
                    <option value="tvSeries">TV Series</option>
                </select>
                <input type="text" placeholder='Poster Url' value={posterUrl} onChange={(e) => sePosterUrl(e.target.value)} />
                <input type="text" placeholder='Embed Url' value={embedUrl} onChange={(e) => setEmbedUrl(e.target.value)} />
                <button disabled={genre.length == 0 || type.length == 0 || title.length == 0 || release.length == 0 || posterUrl.length == 0 || embedUrl.length == 0} onClick={handleAddContent}>Add Content</button>
            </div>
        </div>
    )
}

export default AddContent
