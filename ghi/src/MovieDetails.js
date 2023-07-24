import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./index.css";

const MovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState({});
  const { movie_id } = useParams();

  const fetchMovieDetails = async () => {
    const tmdbUrl = `https://api.themoviedb.org/3/movie/${movie_id}?&api_key=fed7f31bd9b9809594103276b2560e2f`;

    const tmdbResponse = await fetch(tmdbUrl);
    const tmdbData = await tmdbResponse.json();
    const imdbId = tmdbData.imdb_id;

    const omdbUrl = `http://www.omdbapi.com/?i=${imdbId}&apikey=82116a62`;

    const omdbResponse = await fetch(omdbUrl);
    const omdbData = await omdbResponse.json();
    setMovieDetails(omdbData);
  };
  useEffect(() => {
    fetchMovieDetails();
  }, [movie_id]);

  if (!movieDetails) {
    return <div>Fetching data</div>;
  }

  return (
    <>
      <div>
        <h1 className="text-center text-light">{movieDetails.Title}</h1>
      </div>
      <div className="detail-container">
        <div className="poster-left">
          <img
            src={movieDetails.Poster}
            alt="poster"
            className="card details"
          />
        </div>
        <div className="detail-right">
          <p className="text-light">
            Year: {movieDetails.Year}
            <br />
            Rated: {movieDetails.Rated}
            <br />
            Released: {movieDetails.Released}
            <br />
            Runtime: {movieDetails.Runtime}
            <br />
            Genres: {movieDetails.Genre}
            <br />
            Director: {movieDetails.Director}
            <br />
            Writer: {movieDetails.Writer}
            <br />
            Actors: {movieDetails.Actors}
            <br />
            Plot: {movieDetails.Plot}
            <br />
            Language: {movieDetails.Language}
            <br />
            Country: {movieDetails.Country}
            <br />
            Awards: {movieDetails.Awards}
            <br />
            Metascore: {movieDetails.Metascore}
          </p>
        </div>
      </div>
    </>
  );
};
export default MovieDetails;
