import React, { useState, useEffect } from "react";
import "./index.css";
import "./index.css";

function SearchMovies() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  const MovieList = (props) => {
    return (
      <>
        {props.movies.map((movie) => {
          if (movie.Poster === "N/A") {
            return null;
          }
          return (
            <div className="col d-flex justify-content-start m-1">
              <img
                src={movie.Poster}
                alt="poster"
                className="card search-images"
              />
            </div>
          );
        })}
      </>
    );
  };

  const movieSearch = async (search) => {
    const url = `http://www.omdbapi.com/?s=${search}&type=movie&apikey=82116a62`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.Search) {
      setMovies(data.Search);
    } else if (search.length === 0) {
      setMovies([]);
    }

    // const columns = [[], [], [], []];
    // let i = 0;
    // for (const movieColumn of movies) {
    //   columns[i].push(movieColumn);
    //   i += 1;
    //   if (i > 3) {
    //     i = 0;
    //   }
    // }
    // console.log(columns);

    // setMovieColumn(columns);
    // console.log(movieColumn);
  };

  useEffect(() => {
    movieSearch(search);
  }, [search]);

  // useEffect(() => {
  //   const columns = [[], [], [], []];
  //   let i = 0;
  //   for (const movie of movies) {
  //     columns[i].push(movie);
  //     i = (i + 1) % 4;
  //   }
  //   setMovieColumn(columns);
  // }, [movies]);
  // console.log(movieColumn);
  return (
    <>
      <div className="search">
        <h2 className="text-center text-light">Movie Search</h2>
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
          <MovieList movies={movies} />
          {/* {movies.map((movie) => {
            return (
              <div key={movie.imdbID} className="card mb-3 shadow">
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">{movie.Title}</h5>
                  <h6 className="card-year mb-2">{movie.Year}</h6>
                </div>
              </div>
            );
          })} */}
        </div>
      </div>
    </>
  );
}

export default SearchMovies;
