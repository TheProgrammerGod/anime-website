import React from 'react'
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useGlobalContext } from '../Context/global';

function Gallery() {

  const { getCharacterPictures, pictures } = useGlobalContext();

  const { id } = useParams();

  const [index, setIndex] = React.useState(0);

  const handleImageClick = (i) => {
    setIndex(i);
  };

  React.useEffect(() => {
    getCharacterPictures(id);
  }, [id]);


  return (
    <GalleryStyled>
      <div className='back'>
        <Link to='/'>
          <i className='fas fa-arrow-left'></i>
          Back to Home
        </Link>
      </div>
      <div className='big-image'>
        <img src={pictures[index]?.jpg.image_url} alt='' />
      </div>
      <div className='small-images'>
        {pictures?.map((picture, i) => {
          return <div className='image-con' onClick={() => {handleImageClick(i)}} key={i}>
            <img 
            src={picture.jpg.image_url} 
            style={{
              border: i == index ? "3px solid #cae962" : "3px solid #202125",
              filter: i== index ? "grayscale(0)" : "grayscale(60%)",
              transform: i == index ? "scale(1.1)" : "scale(1)"
            }}
            alt="Could'n load"/>
          </div>
        })}
      </div>
    </GalleryStyled>
  )
}

const GalleryStyled = styled.div`
    background-color: #33353c;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;

    .back{
      position: absolute;
      top: 30px;
      left: 15px;
      a{
        color: #cae962;
        text-decoration: none;
        font-weight: bold;
        display: flex;
        gap: 8px;
      }
    }

    .big-image{
      background-color: #202125;
      padding: 25px;
      margin: 15px 0;
      border: 5px solid #33353c;
      border-radius: 7px;
      img{
        width: 350px;
        height: 350px;
        object-fit: cover;
      }
    }

    .small-images{
      background-color: #202125;
      display: flex;
      flex-wrap: wrap;
      gap: 11px;
      width: 80%;
      padding: 30px;
      border-radius: 7px;
      border: 5px solid #33353c;
      margin-bottom: 7px;
      img{
        width: 90px;
        height: 90px;
        object-fit: cover;
        border-radius: 7px;
        border: 5px solid #202125;
        cursor: pointer;
      }
    }
`;

export default Gallery