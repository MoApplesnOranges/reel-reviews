import { useEffect, useState } from 'react';
import { AuthProvider } from '@galvanize-inc/jwtdown-for-react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import SignupForm from './SignupForm.js';
import LoginForm from './LoginForm.js';
import MainPage from './MainPage.js';

// function setToken(userToken) {
//   sessionStorage.setItem('token', JSON.stringify(userToken));
// }

// function getToken() {
//   const tokenString = sessionStorage.getItem('token');
//   const userToken = JSON.parse(tokenString);
//   return userToken?.token;
// }

function App() {
  // const token = getToken();
  const baseURL = process.env.REACT_APP_API_HOST;

  return (
    <div className='container'>
      <BrowserRouter>
        <AuthProvider baseUrl={baseURL}>
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/signup' element={<SignupForm />} />
            <Route path='/login' element={<LoginForm />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
