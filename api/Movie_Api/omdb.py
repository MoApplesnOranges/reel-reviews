import requests


def search_title(string):
    url = f"https://api.themoviedb.org/3/search/movie?query={string}&api_key=fed7f31bd9b9809594103276b2560e2f"
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
