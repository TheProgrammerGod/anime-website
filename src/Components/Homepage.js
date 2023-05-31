import React from 'react'
import styled from 'styled-components';
import { useGlobalContext } from '../Context/global';
import Popular from './Popular'

function Homepage() {

  const { search, searchAnime, handleChange, handleSubmit,
    getPopuplarAnime, getUpcomingAnime, getAiringAnime } = useGlobalContext();

  const [rendered, setRendered] = React.useState('popular');

  const switchComponent = () => {
    switch (rendered) {
      case 'popular':
        return <Popular rendered={rendered} />
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
            }}>Popular</button>
          </div>
          <form action="" className='search-form'>
            <div className='input-control'>
              <input type="text" placeholder="Search Anime" value={search} onChange={handleChange} />
              <button type='submit' onClick={handleSubmit}>Submit</button>
            </div>
          </form>
          <div className='fiter-btn airing-filter'>
            <button onClick={() => {
              setRendered('airing');
              getAiringAnime();
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
    background-color: #EDEDED;
    header{
      padding: 10px 55px;
      width: 60%;
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
          font-size: 14px;
          font-family: inherit;
          cursor: pointer;
          border: 5px solid #e5e7eb;
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
            border: 5px solid #e5e7eb;
            background-color: white;
            font: 17px;
          }
        }
      }
    }
`;

export default Homepage