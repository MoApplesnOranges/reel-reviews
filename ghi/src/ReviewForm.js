import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import useToken from '@galvanize-inc/jwtdown-for-react';
import './index.css';

function ReviewForm(props) {
  const movie_id = parseInt(props.movie_id);
  const { token } = useToken();
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    rating: '',
    movie_id: movie_id,
    account_id: 0,
  });

  const handleFormChange = (e) => {
    const value = e.target.value;
    const inputName = e.target.name;
    setFormData({
      ...formData,
      [inputName]: value,
    });
  };

  const fetchAccountID = async () => {
    const url = 'http://localhost:8000/token';
    const fetchConfig = {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(url, fetchConfig);
    const data = await response.json();

    const accountID = data.account.id;
    setFormData({
      ...formData,
      account_id: accountID,
    });
  };

  const handleRating = (e) => {
    const parsedRating = e.target.value === 'true';
    setFormData({
      ...formData,
      rating: parsedRating,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const locationUrl = `http://localhost:8000/api/movie/${movie_id}/review`;

    const fetchConfig = {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
        credentials: 'include',
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(locationUrl, fetchConfig);
    if (response.ok) {
      setFormData({
        title: '',
        body: '',
        rating: '',
        movie_id: movie_id,
        account_id: 0,
      });
      window.location.reload();
    }
  };

  useEffect(() => {
    fetchAccountID();
  }, []);

  return (
    <div className='row'>
      <div className='offset-3 col-6'>
        <div className='shadow p-4 mt-4'>
          <h1 style={{ color: 'white' }}>Post a new Review</h1>
          <form onSubmit={handleSubmit} id='create-review-form'>
            <div className='form-floating mb-3'>
              <input
                onChange={handleFormChange}
                value={formData.title}
                placeholder='Title'
                required
                type='text'
                name='title'
                id='title'
                className='form-control'
              />
              <label htmlFor='title'>Title</label>
            </div>
            <div className='form-floating mb-3'>
              <input
                onChange={handleFormChange}
                value={formData.body}
                placeholder='Body'
                required
                type='body'
                name='body'
                id='body'
                className='form-control'
              />
              <label htmlFor='body'>Body</label>
            </div>
            <div className='mb-3'>
              <Form.Check
                className='like-button'
                type='radio'
                name='rating'
                required
                label='Like'
                value='true'
                checked={formData.rating}
                onChange={handleRating}
              />

              <Form.Check
                className='dislike-button'
                type='radio'
                name='rating'
                required
                label='Dislike'
                value='false'
                checked={formData.rating === false}
                onChange={handleRating}
              />
            </div>
            <button className='btn btn-primary'>Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReviewForm;
