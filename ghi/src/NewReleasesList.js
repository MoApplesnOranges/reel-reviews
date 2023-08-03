import React, { useState, useEffect } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./index.css";

function NewReleasesList() {
  const [newReleaseMovies, setNewReleaseMovies] = useState([]);

  const fetchNewReleaseData = async () => {
    const url =
      "https://api.themoviedb.org/3/movie/now_playing?api_key=fed7f31bd9b9809594103276b2560e2f";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setNewReleaseMovies(data.results);
    }
  };

  useEffect(() => {
    fetchNewReleaseData();
  }, []);

  return (
    <>
      <div>
        <h2 className="text-center text-light">New Releases</h2>
      </div>
      <div className="container-fluid movie-row">
        <div className="row">
          {newReleaseMovies.map((movie) => (
            <div
              key={movie.id}
              className="col d-flex justify-content-start m-1"
            >
            <OverlayTrigger
              key={movie.id}
              placement="top"
              overlay={
                <Tooltip id={`tooltip-${movie.id}`}>
                  {movie.title}
                </Tooltip>
              }
              >
              <Link to={`/movie/${movie.id}`}>
                <img
                  key={movie.id}
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  className="card"
                />
              </Link>
            </OverlayTrigger>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default NewReleasesList;
