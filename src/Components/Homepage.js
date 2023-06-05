import React from 'react'
import styled from 'styled-components';
import { useGlobalContext } from '../Context/global';
import Airing from './Airing';
import Popular from './Popular'
import Upcoming from './Upcoming';

function Homepage() {

  const { search, handleChange, handleSubmit,
    getPopularAnime, getUpcomingAnime, isSearch, searchResults } = useGlobalContext();

  const [rendered, setRendered] = React.useState('airing');

  const switchComponent = () => {
    switch (rendered) {
      case 'popular':
        return <Popular rendered={rendered} />
      case 'upcoming':
        return <Upcoming rendered={rendered} />
      case 'airing':
        return <Airing rendered={rendered} />
      default:
        return <Popular rendered={rendered} />
    }
  };


  return (
    <HomepageStyled>
      <header>
        <div className='logo'>
          <h1>
            {rendered === 'popular' ? 'Popular Anime' :
              rendered === 'airing' ? 'Airing Anime' : 'Upcoming Anime'}
          </h1>
        </div>
        <div className='search-container'>
          <div className='fiter-btn popular-filter'>
            <button onClick={() => {
              setRendered('popular');
              getPopularAnime();
            }}><i className='fas fa-fire'></i>Popular</button>
          </div>
          <form action="" className='search-form' onSubmit={handleSubmit}>
            <div className='input-control'>
              <input type="text" placeholder="Search Anime" value={search} onChange={handleChange} />
              <button type='submit'><i className="fa-sharp fa-solid fa-magnifying-glass"></i></button>
            </div>
            <div className='search-results'>
              {isSearch ? (searchResults.length > 0 ? searchResults.length + " Results found" : "No results found") : ""}
            </div>
          </form>

          <div className='fiter-btn airing-filter'>
            <button onClick={() => {
              setRendered('airing');
            }}>Airing</button>
          </div>
          <div className='fiter-btn upcoming-filter'>
            <button onClick={() => {
              setRendered('upcoming');
              getUpcomingAnime();
            }}>Upcoming</button>
          </div>
        </div>
      </header>
      {switchComponent()}
    </HomepageStyled>
  )
}

const HomepageStyled = styled.div`
    background-color: #202125;

    header{
      padding: 10px 55px;
      width: 60%;
      color: #ccc;
      margin: 0px auto;
      .logo{
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 10px 0px;
      }
      .search-container{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 12px;
        button{
          padding: 10px 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          outline: none;
          border-radius: 30px;
          background-color: white;
          font-size: 16px;
          font-weight: 300px;
          font-family: inherit;
          cursor: pointer;
          border: 5px solid #202125;
          gap: 8px;
          background-color: #cae962;
        }
        form{
          width: 100%;
          .input-control {
            position: relative;

            button{
              position: absolute;
              right: 0;
              top: 50%;
              transform: translateY(-50%);
            }
          }
          .input-control input{
            width: 100%;
            padding: 10px 20px;
            border: none;
            outline: none;
            border-radius: 30px;
            border: 3px solid #202125;
            background-color: white;
            font-size: 17px;
            color: #495057;
          }
          .search-results{
            margin-top: 5px;
            text-align: center;
          }
        }
      }
    }
`;

export default Homepage