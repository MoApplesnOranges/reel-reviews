import React, { useState, useEffect } from "react";
import "./index.css";

function TopRatedList() {
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  const fetchTopRatedData = async () => {
    const url =
      "https://api.themoviedb.org/3/movie/top_rated?api_key=fed7f31bd9b9809594103276b2560e2f";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setTopRatedMovies(data.results);
    }
  };

  useEffect(() => {
    fetchTopRatedData();
  }, []);

  return (
    <>
      <div>
        <h2 className="text-center text-light">Top Rated</h2>
      </div>
      <div className="container-fluid movie-row">
        <div className="row">
          {topRatedMovies.map((movie) => (
            <div
              key={movie.id}
              className="col d-flex justify-content-start m-1"
            >
              {movie.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  className="card"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default TopRatedList;
