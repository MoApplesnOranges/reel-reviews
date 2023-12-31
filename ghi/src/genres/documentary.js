import React from "react";
import "../index.css";
import { Link } from "react-router-dom";

const Documentary = (props) => {
  const genres = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western",
  };

  const genre_list = [];
  for (let movie of props.documentaryData.results) {
    genre_list.push(movie);
  }

  return (
    <>
      <div>
        <h2 className="text-center text-light">{genres[99]}</h2>
      </div>
      <div className="genre-display">
        <div className="grid">
          {genre_list.map((movie, index) => (
            <div key={index} className="cell">
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt="poster"
                  className="card"
                ></img>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Documentary;
