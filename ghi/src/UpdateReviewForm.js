import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import useToken from "@galvanize-inc/jwtdown-for-react";
import "./index.css";

function UpdateReviewForm(props) {
  const movie_id = parseInt(props.movie_id);
  const { token } = useToken();
  const [formData, setFormData] = useState({});
  const [poster, setPoster] = useState("");

  useEffect(() => {
    const fetchMeEverything = async () => {
      const reviewsURL = `http://localhost:8000/api/movie/${movie_id}/reviews/all`;
      const reviewsFetch = {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const reviewsResponse = await fetch(reviewsURL, reviewsFetch);
      const reviewsData = await reviewsResponse.json();

      const accountURL = "http://localhost:8000/token";
      const accountFetch = {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const accountResponse = await fetch(accountURL, accountFetch);
      const accountData = await accountResponse.json();
      const accountID = accountData.account.id;

      for (let review of reviewsData) {
        if (review.account_id === accountID) {
          setFormData({
            title: review.title,
            body: review.body,
            rating: review.rating,
            movie_id: movie_id,
            account_id: accountID,
          });
        }
      }
    };
    fetchMeEverything();
  }, []);

  const handleFormChange = (e) => {
    const value = e.target.value;
    const inputName = e.target.name;
    setFormData({
      ...formData,
      [inputName]: value,
    });
  };

  const handleRating = (e) => {
    const parsedRating = e.target.value === "true";
    setFormData({
      ...formData,
      rating: parsedRating,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const locationUrl = `http://localhost:8000/api/movie/${movie_id}/review`;

    const fetchConfig = {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(locationUrl, fetchConfig);
    if (response.ok) {
      setFormData({
        title: "",
        body: "",
        rating: "",
        movie_id: movie_id,
        account_id: 0,
      });
      window.location.reload();
    }
  };

  useEffect(() => {
    const fetchMoviePoster = async () => {
      const tmdbUrl = `https://api.themoviedb.org/3/movie/${movie_id}?&api_key=fed7f31bd9b9809594103276b2560e2f&append_to_response=videos`;
      const tmdbResponse = await fetch(tmdbUrl);
      const tmdbData = await tmdbResponse.json();
      const imdbId = tmdbData.imdb_id;
      const omdbUrl = `http://www.omdbapi.com/?i=${imdbId}&apikey=82116a62`;
      const omdbResponse = await fetch(omdbUrl);
      const omdbData = await omdbResponse.json();
      setPoster(omdbData);
    };
    fetchMoviePoster();
  }, []);

  return (
    <div>
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <img
            src={poster.Poster}
            alt="poster"
            className="updateReviewPoster"
          />
          <form onSubmit={handleSubmit} id="create-review-form">
            <div className="form-floating mb-3">
              <input
                onChange={handleFormChange}
                value={formData.title}
                placeholder="Title"
                required
                type="text"
                name="title"
                id="title"
                className="form-control"
              />
              <label htmlFor="title">Title</label>
            </div>
            <div className="form-floating mb-3">
              <textarea
                onChange={handleFormChange}
                value={formData.body}
                placeholder="Body"
                required
                type="body"
                name="body"
                id="body"
                className="form-control"
              ></textarea>
              <label htmlFor="body">Review</label>
            </div>
            <div className="mb-3" style={{ color: "white" }}>
              <Form.Check
                className="like-button"
                type="radio"
                name="rating"
                required
                label="Like"
                value="true"
                checked={formData.rating}
                onChange={handleRating}
              />

              <Form.Check
                className="dislike-button"
                type="radio"
                name="rating"
                required
                label="Dislike"
                value="false"
                checked={formData.rating === false}
                onChange={handleRating}
              />
            </div>
            <button className="btn btn-warning">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateReviewForm;
