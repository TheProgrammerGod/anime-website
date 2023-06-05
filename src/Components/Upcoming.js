import React from 'react'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../Context/global'
import styled from 'styled-components'
import Sidebar from './Sidebar';

function Upcoming({ rendered }) {
    const { upcomingAnime, isSearch, searchResults } = useGlobalContext();

    const conditionalRender = () => {
        if (!isSearch && rendered === 'upcoming') {
            return upcomingAnime?.map((anime) => {
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
        <UpcomingStyled>
            <div className='upcoming-anime'>
                {conditionalRender()}
            </div>
            <Sidebar/>
        </UpcomingStyled>
    )
}

const UpcomingStyled = styled.div`
    display: flex;
    .upcoming-anime{
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

    .upcoming-anime a{
        height: 500px;
        border-radius: 7px;
        border-top: 5px solid #33353c;
    }

    img{
        height: 100%;
        width: 100%;
        object-fit: cover;
        border-radius: 5px;
    }
`;

export default Upcoming