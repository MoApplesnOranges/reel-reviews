import React, { useState, useEffect } from 'react';
import './index.css';

const MovieGenres = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let url = new URL('https://api.themoviedb.org/3/discover/movie');
      const API_KEY = 'fed7f31bd9b9809594103276b2560e2f';
      let params = { api_key: API_KEY, with_genres: 28 };
      Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key])
      );

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Response not ok');
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []);
  const genre_list = [];
  for (let movie of data.results) {
    genre_list.push(movie.poster_path);
  }
  return (
    <>
      <div className='genre-display'>
        <div className='grid'>
          {genre_list.map((movie, index) => (
            <div key={index} className='cell'>
              <img src={movie} alt='poster' className='card'></img>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MovieGenres;
