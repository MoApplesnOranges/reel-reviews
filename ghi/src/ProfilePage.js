import React, { useState, useEffect } from "react";
import "./index.css";
import { useParams } from "react-router-dom";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

const ProfilePage = () => {
  const [profile, setProfile] = useState({});
  const [reviews, setReviews] = useState([]);
  const { token } = useAuthContext();

  const fetchProfileData = async () => {
    const tokenUrl = "http://localhost:8000/token";
    const fetchConfig = {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(tokenUrl, fetchConfig);
    const data = await response.json();
    setProfile(data.account);
  };

  const fetchReviewData = async () => {
    const reviewsUrl = "http://localhost:8000/api/reviews/all";
    const fetchConfig = {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(reviewsUrl, fetchConfig);
    const reviewData = await response.json();
    console.log(reviewData);
    const myReviews = [];
    for (const review of reviewData) {
      if (review.account_id === profile.id) {
        myReviews.push(review);
      }
    }
    console.log(myReviews);
    setReviews(myReviews);
    console.log(reviews);
  };

  useEffect(() => {
    fetchProfileData();
    fetchReviewData();
  }, []);

  return (
    <div>
      <h1 className="text-light hello">Hello, {profile.username}</h1>
      <div>
        <img className="avatar" src={profile.avatar} alt="avatar" />
      </div>
    </div>
  );
};

export default ProfilePage;
