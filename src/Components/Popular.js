import React from 'react'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../Context/global'
import styled from 'styled-components'
import Sidebar from './Sidebar';

function Popular({ rendered }) {
    const { popularAnime, isSearch, searchResults } = useGlobalContext();

    const conditionalRender = () => {
        if (!isSearch && rendered === 'popular') {
            return popularAnime?.map((anime) => {
                return <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                    <img src={anime.images.jpg.large_image_url} alt="Couldn't load" />
                </Link>
            });
        }
        else {
            return searchResults?.map((anime) => {
                return <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                    <img src={anime.images.jpg.large_image_url} alt="Couldn't load" />
                </Link>
            });
        }
    }
    return (
        <PopularStyled>
            <div className='popular-anime'>
                {conditionalRender()}
            </div>
            <Sidebar/>
        </PopularStyled>
    )
}

const PopularStyled = styled.div`
    display: flex;  
    .popular-anime{
        padding-right: 0px;
        padding-top: 35px;
        padding-bottom: 35px;
        padding-left: 15px;
        margin-top: 35px;
        width: 100%;
        background-color: #33353c;
        border-top: 5px solid #33353c;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        grid-gap: 25px;
    }

    .popular-anime a{
        height: 500px;
        border-radius: 7px;
        border: 5px solid #33353c;
    }

    img{
        height: 100%;
        width: 100%;
        object-fit: cover;
        border-radius: 5px;
    }
`;

export default Popular