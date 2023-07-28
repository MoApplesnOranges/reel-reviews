import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./index.css";
import ReviewForm from "./ReviewForm";
import UpdateReviewForm from "./UpdateReviewForm";

const MovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState({});
  const [HideReview, setHideReview] = useState(false);
  const [reviewConfirmation, setReviewConfirmation] = useState(false);
  const [review, setReviewData] = useState([]);

  const [trailer, setTrailer] = useState("");
  const { movie_id } = useParams();

  useEffect(() => {
    const fetchReviews = async () => {
      const url = "http://localhost:8000/token";
      const urlReviewsAll = "http://localhost:8000/api/reviews/all/loggedout";
      const fetchConfig = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      };
      try {
        const responseToken = await fetch(url, fetchConfig);
        const tokenData = await responseToken.json();
        const responseReviewsAll = await fetch(urlReviewsAll, fetchConfig);
        const reviewsAllData = await responseReviewsAll.json();

        let reviewsArray = [];
        for (let reviews in reviewsAllData) {
          if (reviewsAllData[reviews].movie_id == movie_id) {
            reviewsArray.push(reviewsAllData[reviews]);
          }
        }
        setReviewData(reviewsArray);

        for (let review in reviewsAllData) {
          if (
            reviewsAllData[review].movie_id == movie_id &&
            reviewsAllData[review].username === tokenData.account.username
          ) {
            setReviewConfirmation(true);

            break;
          } else {
            setReviewConfirmation(false);
          }
        }

        if (tokenData === null) {
          setHideReview(false);
        } else {
          setHideReview(true);
        }
      } catch (error) {
        console.error("This is expected if logged out:", error);
      }
    };
    fetchReviews();
  }, []);

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
      <div className="videoPlayer">
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
      </div>
      <div>
        <div className="reviews-background">
          <h2 className="review-header">Reviews</h2>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Body</th>
                <th>Rating</th>
                <th>User</th>
                <th>Posted Time</th>
              </tr>
            </thead>
            <tbody>
              {review.map((reviews, index) => (
                <tr
                  key={index}
                  style={{
                    color: reviews.rating === true ? "green" : "red",
                  }}
                >
                  <td>{reviews.title}</td>
                  <td>{reviews.body}</td>
                  <td>{reviews.rating ? "Positive" : "Negative"}</td>
                  <td>{reviews.username}</td>
                  <td>
                    {new Date(reviews.posted_time).toLocaleString("en-US", {
                      timeZone: "America/New_York",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        {HideReview && reviewConfirmation === false && (
          <ReviewForm movie_id={movie_id} />
        )}
      </div>
      <div>
        {HideReview && reviewConfirmation === true && (
          <UpdateReviewForm movie_id={movie_id} />
        )}
      </div>
    </>
  );
};
export default MovieDetails;
