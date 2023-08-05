import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import { CloseButton } from "react-bootstrap";

function SearchBar() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [hideSearch, setHideSearch] = useState(false);

  useEffect(() => {
    const movieSearch = async (search) => {
      const url = `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&api_key=fed7f31bd9b9809594103276b2560e2f`;

      const response = await fetch(url);
      const data = await response.json();
      if (data.results) {
        setMovies(data.results);
      }
    };
    movieSearch(search);
    if (search.length > 0) {
      setHideSearch(true);
    } else {
      setHideSearch(false);
    }
  }, [search]);

  const closeSearch = () => {
    setHideSearch(false);
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          className="movie-inputs"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="search for a movie"
        />
        <div>
          {hideSearch && (
            <div className="dataResult">
              <CloseButton className="close-button" onClick={closeSearch} />
              {movies.map((value, key) => {
                if (value.poster_path === null) {
                  return null;
                }
                return (
                  <div className="movie-columns">
                    <Link className="movie-image" to={`/movie/${value.id}`}>
                      <img
                        className="movie-image-dropdown"
                        src={`https://image.tmdb.org/t/p/w200${value.poster_path}`}
                        alt="movie-poster"
                      />
                    </Link>
                    <Link
                      className="movie-title-link"
                      to={`/movie/${value.id}`}
                    >
                      <p className="movie-text">{value.title}</p>
                    </Link>
                    <p className="release-date">{value.release_date}</p>
                    <p className="average-rating">{`Rating: ${value.vote_average}`}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
