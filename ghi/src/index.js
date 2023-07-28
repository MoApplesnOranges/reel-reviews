import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

async function loadData() {
  const genres = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western',
  };

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTExOTkxM2JmNjVlZWUwMzY0MGM3YzI3YzBhZjEzYiIsInN1YiI6IjY0Yjg5N2NkMjU4ODIzMDExZGNhYmUzYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.d3S1BuF5KrAKvxOqPtHPnJRad5osdtOaIkRlW584UeE',
    },
  };

  let genreID = 1;

  const dataArray = [];
  for (let prop in genres) {
    genreID = prop;

    let url = new URL(
      `https://api.themoviedb.org/3/discover/movie?with_genres=${genreID}`
    );

    const response = await fetch(url, options);
    const data = await response.json();

    dataArray.push(data);
  }

  root.render(
    <React.StrictMode>
      <App
        action={dataArray[5]}
        adventure={dataArray[0]}
        animation={dataArray[2]}
        comedy={dataArray[6]}
        crime={dataArray[10]}
        documentary={dataArray[11]}
        drama={dataArray[3]}
        family={dataArray[16]}
        fantasy={dataArray[1]}
        history={dataArray[7]}
        horror={dataArray[4]}
        music={dataArray[14]}
        mystery={dataArray[13]}
        romance={dataArray[15]}
        scienceFiction={dataArray[12]}
        tvMovie={dataArray[18]}
        thriller={dataArray[9]}
        war={dataArray[17]}
        western={dataArray[8]}
      />
    </React.StrictMode>
  );
}

loadData();
