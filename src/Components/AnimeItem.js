import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function AnimeItem() {

    const { id } = useParams();

    //state
    const [anime, setAnime] = useState({});
    const [characters, setCharacters] = useState([]);
    const [showMore, setShowMore] = useState(false);

    //destructing anime
    const { title, synopsis, images, status, trailer, duration, aired, season, rank, score, scored_by, popularity, rating, source } = anime;


    //fetching anime data
    const getAnime = async (anime) => {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}`);
        const data = await response.json();
        setAnime(data.data);
    };

    useEffect(() => {
        getAnime(id);
    }, []);


    return (
        <>
            <h1>{title}</h1>
            <div className='details'>
                <div className='detail'>
                    <div className='image'>
                        <img src={images?.jpg.large_image_url} alt='' />
                    </div>
                    <div className='anime-details'>
                        <p><span>Aired: </span><span>{aired?.string}</span></p>
                        <p><span>Rating: </span><span>{rating}</span></p>
                        <p><span>Rank: </span><span>{rank}</span></p>
                        <p><span>Score: </span><span>{score}</span></p>
                        <p><span>Scored By: </span><span>{scored_by}</span></p>
                        <p><span>Popularity: </span><span>{popularity}</span></p>
                        <p><span>Status: </span><span>{status}</span></p>
                        <p><span>Source: </span><span>{source}</span></p>
                        <p><span>Season: </span><span>{season}</span></p>
                        <p><span>Duration: </span><span>{duration}</span></p>
                    </div>
                    <p className='description'>
                        {showMore? synopsis : synopsis?.substring(0,450) + '...'}
                    <button onClick={() => {setShowMore(!showMore)}}>
                        {showMore ? "Show Less" : "Read more"}
                    </button>
                    </p>
                </div>
            </div>
        </>
    )
}

export default AnimeItem