import os
import json
import requests


def search_title(string):
    querystring = {
        "exact": "false",
        "titleType": "movie",
    }
    url = f"https://moviesdatabase.p.rapidapi.com/titles/search/title/{string}"
    headers = {
        "X-RapidAPI-Key": "0c68cc2274msh3b4f58594c8fe7ep16a643jsn9d4d20c7a58f",
        "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
    }
    response = requests.get(url, headers=headers, params=querystring)
    # result = json.dumps(response)
    content = response.json()
    # try:
    movie_list = []
    for movie in range(len(content["results"])):
        film = {
            "image": content["results"][movie]["primaryImage"]["url"],
            "title": content["results"][movie]["originalTitleText"]["text"],
            "release_date": content["results"][movie]["releaseDate"],
        }
        movie_list.append(
            film
            # {
            #     "image": movie["primaryImage"]["url"],
            #     "title": movie["originalTitleText"]["text"],
            #     "release_date": movie["releaseDate"],
            # }
        )
    return movie_list
    # except (KeyError, IndexError):
    #     return None
