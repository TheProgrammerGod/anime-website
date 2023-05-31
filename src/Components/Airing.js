import React from 'react'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../Context/global'
import styled from 'styled-components'

function Airing({ rendered }) {
    const { airingAnime, isSearch, searchResults } = useGlobalContext();

    const conditionalRender = () => {
        if (!isSearch && rendered === 'airing') {
            return airingAnime.map((anime) => {
                return <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                    <img src={anime.images.jpg.large_image_url} alt="Couldn't load" />
                </Link>
            });
        }
        else {
            return searchResults.map((anime) => {
                return <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                    <img src={anime.images.jpg.large_image_url} alt="Couldn't load" />
                </Link>
            });
        }
    }
    return (
        <AiringStyled>
            <div className='airing-anime'>
                {conditionalRender()}
            </div>
        </AiringStyled>
    )
}

const AiringStyled = styled.div`
    .airing-anime{
        padding-right: 0px;
        padding-top: 35px;
        padding-bottom: 35px;
        padding-left: 15px;
        margin-top: 35px;
        width: 100%;
        background-color: white;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    .airing-anime a{
        margin-top: 7px;
        width: 300px;
        height: 500px;
        border-radius: 7px;
        border: 5px solid #e5e7eb;

    }

    img{
        height: 100%;
        width: 100%;
        object-fit: cover;
        border-radius: 5px;
    }
`;

export default Airing