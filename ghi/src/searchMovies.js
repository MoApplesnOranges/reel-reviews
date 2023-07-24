import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./index.css";

function SearchMovies() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  const movieSearch = async (search) => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${search}&api_key=fed7f31bd9b9809594103276b2560e2f`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.results) {
      setMovies(data.results);
    }
  };

  const MovieList = (props) => {
    return (
      <>
        {props.movies.map((movie) => {
          if (movie.poster_path === null) {
            return null;
          }
          return (
            <div
              key={movie.id}
              className="col d-flex justify-content-start m-1"
            >
              <Link to={`/movie/${movie.id}`}>
                <img
                  key={movie.id}
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt="poster"
                  className="card search-images"
                />
              </Link>
            </div>
          );
        })}
      </>
    );
  };

  useEffect(() => {
    movieSearch(search);
  }, [search]);

  return (
    <>
      <div className="search">
        <h2 className="text-center text-light header">Movie Search</h2>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Find a movie"
          className="form-control"
        />
      </div>
      <div className="container-fluid movie-row">
        <div className="row">
          {search.length > 0 ? (
            <MovieList movies={movies} />
          ) : (
            <h1 className="text-center text-light">
              Find your next favorite film!
            </h1>
          )}
        </div>
      </div>
    </>
  );
}
export default SearchMovies;
