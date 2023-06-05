import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components';

function AnimeItem() {

    const { id } = useParams();

    //state
    const [anime, setAnime] = useState({});
    const [characters, setCharacters] = useState([]);
    const [showMore, setShowMore] = useState(false);

    //destructing anime
    const { title_english, synopsis, images, status, duration, aired, season, rank, score, scored_by, popularity, rating, source } = anime;


    //fetching anime data
    const getAnime = async (anime) => {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}`);
        const data = await response.json();
        setAnime(data.data);
    };

    //fetching character data
    const getCharacters = async (anime) => {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}/characters`);
        const data = await response.json();
        setCharacters(data.data);
    };

    useEffect(() => {
        getAnime(id);
        getCharacters(id);
    }, [id]);


    return (
        <AnimeItemStyled>
            <h1>{title_english}</h1>
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
                </div>
                <p className='description'>
                    {showMore ? synopsis : synopsis?.substring(0, 450) + '...'}
                    <button onClick={() => { setShowMore(!showMore) }}>
                        {showMore ? "Show Less" : "Read more"}
                    </button>
                </p>
            </div>
            <h3 className='title'>Trailer</h3>
            {/* <div className='trailer-con'>
                    {trailer?.embed_url && 
                    <iframe 
                    src={trailer?.embed_url}
                    width="800"
                    height="450"
                    allowFullScreen
                    allow='encrpyted-media picture-in-picture fullscreen' 
                    ></iframe>}
                </div> */}
            <h3 className='title'>Characters</h3>
            <div className='characters'>
                {characters?.map((character, index) => {
                    const { role } = character
                    const { images, name, mal_id } = character.character;
                    return (
                        <Link to={`/character/${mal_id}`} key={index}>
                            <div className='character'>
                                <img src={images?.jpg.image_url} alt='' />
                                <h3>{name}</h3>
                                <p>{role}</p>
                            </div>
                        </Link>
                    );

                })}
            </div>
        </AnimeItemStyled>
    )
}


const AnimeItemStyled = styled.div`
    background-color: #33353c;
    padding: 20px 150px;
    color: #cae962;
    h1{
        margin-bottom: 17px;
        font-size: 40px;
        font-weight: bold;
        color: white;
        cursor: default;
    }

    .title{
        margin: 34px 0px;
        font-size: 25px;
        cursor: default;
    }

    .description{
        margin: 25px 0px;
        color: white;
        line-height: 30px;

        button {
            background-color: transparent;
            border: none;
            outline: none;
            cursor: pointer;
            font-size: 15px;
            color: #cae962;
            font-weight: bold;
        }
    }

    .details{
        background-color: #202125   ;
        border-radius: 20px;
        padding: 25px;
        border: 5px solid #33353c;
        color: white;
        .detail{
            display: flex;
            justify-content: space-evenly;
            img{
                border-radius: 7px;
            }
        }
        .anime-details{
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            p{
                display: flex;
                gap: 10px;
            }

            p span:first-child{
                font-weight: bold;
                color: #cae962;
            }
        }
    }

    .trailer-con{
        display: flex;
        align-items: center;
        justify-content: center;
        iframe{
            outline: none;
            border: 5px solid #33353c;
            border-radius: 10px;
            background-color: #202125;
            padding: 17px;
        }
    }

    .characters{
        display: grid;
        grid-template-columns: repeat(auto-fill,minmax(200px, 1fr));
        grid-gap: 25px;
        background: #202125;
        padding: 25px;
        border-radius: 20px;
        border: 5px solid #33353c;
        .character{
            padding: 5px 7px;
            border-radius: 7px;
            background-color: #33353c;
            img{
                width: 100%;
            }
            h3{
                padding: 5px 0;
                color: white;
            }
            p{
                font-size: 14px;
                color: #cae962;
            }
            &:hover{
                transform: translateY(-5px);
            }
        }
    }
`;

export default AnimeItem