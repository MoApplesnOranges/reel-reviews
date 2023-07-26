import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./index.css";

const MovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState({});
  const [trailer, setTrailer] = useState("");
  const { movie_id } = useParams();

  const fetchMovieDetails = async () => {
    const tmdbUrl = `https://api.themoviedb.org/3/movie/${movie_id}?&api_key=fed7f31bd9b9809594103276b2560e2f&append_to_response=videos`;

    const tmdbResponse = await fetch(tmdbUrl);
    const tmdbData = await tmdbResponse.json();
    const imdbId = tmdbData.imdb_id;
    let video = null;
    if (tmdbData.videos && tmdbData.videos.results) {
      for (const result of tmdbData.videos.results) {
        if (result.type === "Trailer") {
          video = result.key;
          break;
        }
      }
    }
    setTrailer(video);

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
      <div className="embed-responsive embed-responsive-16by9">
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${trailer}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    </>
  );
};
export default MovieDetails;
