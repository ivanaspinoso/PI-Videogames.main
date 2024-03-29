import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import s from "./Game.module.css"

export const Game = (props) => {
    const [allGenres, setGenres] = useState([]);
    let { name, background_image, genres, rating, id } = props;
 
  useEffect(() => {
    const getGenres = async () => {
      try {
        const response = await axios.get('http://localhost:3001/genres');
        const genresData = response.data;

        setGenres(genresData);
      } catch (error) {
        console.error('Error al obtener los géneros:', error);
      }
    };
    getGenres();
  }, []);
  const genreNames = genres?.map(genreId => allGenres[genreId]);
  const formattedGenres = genreNames?.join(', ') || 'No genres available';

  return (
    <div className={s.game}>
      <Link to={`/detail/${id}`} className={s.link}>
        <div>
          <span className={s.rating}>{`${rating}★`}</span>
          <h5 className={s.title}>{name}</h5>
          <img
            src={background_image || 'https://myvideogamelist.com/assets/images/default.png'}
            alt={'This background is not available'}
            className={s.image}
          />
             {
          <p>
          <strong>Genres :</strong>{" "}
          {typeof props.genres[0] === 'object' ? props?.genres?.map((genre, index) => (
            <span key={index}>
              {genre.name} 
              {index < props.genres.length - 1 && ", "}
            </span>
          )) : props?.genres?.map((genre, index) => (
            <span key={index}>
              {genre} 
              {index < props.genres.length - 1 && ", "}
            </span>
          ))}
        </p>
        
          }

          
        </div>
      </Link>
    </div>
  );
};
