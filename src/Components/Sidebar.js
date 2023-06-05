import React from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../Context/global';
import { Link } from 'react-router-dom'

function Sidebar() {

    const { airingAnime } = useGlobalContext();

    const sorted = airingAnime?.sort((a, b) => {
        return b.score - a.score;
    })
    return (
        <SidebarStyled>
            <h3>Top 5 Popular</h3>
            <div className='anime'>
                {sorted?.slice(0, 5).map((anime) => {
                    return <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                        <img src={anime.images.jpg.large_image_url} alt="Couldn't Load" />
                        <h4>{anime.title_english}</h4>
                    </Link>
                })}
            </div>
        </SidebarStyled>
    )
}

const SidebarStyled = styled.div`
    margin-top: 35px;
    border-top: 5px solid #33353c;
    padding-right: 75px;
    padding-left: 30px;
    padding-top: 30px;
    color: #ccc;
    background-color: #33353c;
    .anime{
        background-color: #33353c;
        display: flex;
        flex-direction: column;
        width: 150px;
        img{
            width: 100%;
            border-radius: 5px;
            border: 5px solid #202125;
        }
        a{
            margin-top: 15px;
            display: flex;
            flex-direction: column;
            gap: 7px;
            padding: 7px;
            color: #ccc;
            background-color: #202125;
            border-radius: 5px;
            border: 5px solid #202125;
        }
    }
`;

export default Sidebar