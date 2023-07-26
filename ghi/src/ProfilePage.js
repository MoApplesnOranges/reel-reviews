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
    try {
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
      console.log("Review Data:", reviewData);
      const myReviews = reviewData.filter((review) => review.account_id === profile.id);
      // const myReviews = reviewData.filter((review) => parseInt(review.account_id) === parseInt(profile.id));
      setReviews(myReviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }

    // const reviewsUrl = "http://localhost:8000/api/reviews/all";
    // const fetchConfig = {
    //   method: "GET",
    //   credentials: "include",
    //   headers: {
    //     "Content-Type": "application/json",
    //     // Authorization: `Bearer ${token}`,
    //   },
    // };
    // const response = await fetch(reviewsUrl, fetchConfig);
    // const reviewData = await response.json();
    // console.log("Review Data:", reviewData);
    // // const myReviews = reviewData.filter((review) => review.account_id === profile.id);
    // const myReviews = reviewData.filter((review) => parseInt(review.account_id) === parseInt(profile.id));
    // // const myReviews = profile.id ? reviewData.filter((review) => review.account_id === profile.id) : [];
    // setReviews(myReviews);
  };

  // useEffect(() => {
  //   fetchProfileData().then(() => {
  //     fetchReviewData();
  //   });
  // }, []);

  useEffect(() => {
  const fetchData = async () => {
    await fetchProfileData();
  };
  fetchData();
  }, []);

  useEffect(() => {
  const fetchData = async () => {
    if (profile) {
      await fetchReviewData();
    }
  };
  fetchData();
  }, [profile]);

  console.log("Profile ID:", profile.id);


  return (
    <div>
      {profile ? ( // Only render if profile is available
        <React.Fragment>
          <h1 className="text-light hello">Hello, {profile.username}</h1>
          <div>
            <img className="avatar" src={profile.avatar} alt="avatar" />
          </div>
          <div>
            <h2 className="text-light hello">My Reviews:</h2>
            {reviews !== null ? ( // Only render if reviews have been fetched
              reviews.length > 0 ? (
                reviews.map((review) => (
                  <div key={review.id}>
                    <h3 className="text-light hello">{review.title}</h3>
                    <p className="text-light hello">{review.body}</p>
                  </div>
                ))
              ) : (
                <p className="text-light hello">No reviews found.</p>
              )
            ) : (
              <p className="text-light hello">Loading reviews...</p>
            )}
          </div>
        </React.Fragment>
      ) : (
        <p className="text-light hello">Loading profile...</p>
      )}
    </div>
    // <div>
    //   <h1 className="text-light hello">Hello, {profile.username}</h1>
    //   <div>
    //     <img className="avatar" src={profile.avatar} alt="avatar" />
    //   </div>
    //   <div>
    //     <h2 className="text-light hello">My Reviews:</h2>
    //     {reviews.length > 0 ? (
    //       reviews.map((review) => (
    //         <div key={review.id}>
    //           <h3 className="text-light hello">{review.title}</h3>
    //           <p className="text-light hello">{review.body}</p>
    //         </div>
    //       ))
    //     ) : (
    //       <p className="text-light hello">No reviews found.</p>
    //     )}
    //   </div>
    // </div>
  );
};

export default ProfilePage;
