import os
import json
import requests


def search_title(string):
    url = f"http://www.omdbapi.com/?s={string}&type=movie&apikey=82116a62"
    response = requests.get(url)
    if response.status_code == 200:
        content = response.json()
        return content


def get_title(id):
    url = f"http://www.omdbapi.com/?i={id}&apikey=82116a62"
    response = requests.get(url)
    if response.status_code == 200:
        content = response.json()
        return content


def get_new_releases():
    API_KEY = "fed7f31bd9b9809594103276b2560e2f"
    url = "https://api.themoviedb.org/3/movie/now_playing"
    params = {
        "api_key": API_KEY,
        "sort_by": "release_date.desc",
    }
    response = requests.get(url, params=params)
    data = response.json()

    if response.status_code == 200:
        latest_movies = []
        for movie in data["results"]:
            films = {
                movie["title"],
                movie["poster_path"],
                movie["release_date"],
            }
            latest_movies.append(films)
        return latest_movies


# genres = [
#     {28: "Action"},
#     {12: "Adventure"},
#     {16: "Animation"},
#     {35: "Comedy"},
#     {80: "Crime"},
#     {99: "Documentary"},
#     {18: "Drama"},
#     {10751: "Family"},
#     {14: "Fantasy"},
#     {36: "History"},
#     {27: "Horror"},
#     {10402: "Music"},
#     {9648: "Mystery"},
#     {10749: "Romance"},
#     {878: "Science Fiction"},
#     {10770: "TV Movie"},
#     {53: "Thriller"},
#     {10752: "War"},
#     {37: "Western"},
# ]


def get_movies_by_genre(genre_id):
    API_KEY = "fed7f31bd9b9809594103276b2560e2f"
    url = "https://api.themoviedb.org/3/discover/movie"

    params = {"api_key": API_KEY, "with_genres": genre_id}

    response = requests.get(url, params=params)
    data = response.json()
    if response.status_code == 200:
        genre = []
        for movie in data["results"]:
            films = {
                movie["title"],
                movie["poster_path"],
                movie["release_date"],
            }
            genre.append(films)
    return genre
