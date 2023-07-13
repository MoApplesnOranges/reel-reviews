import os
import json
import requests


def search_title(string):
    querystring = {
        "exact": "true",
        "titleType": "movie",
    }
    url = f"https://moviesdatabase.p.rapidapi.com/titles/search/title/{string}"
    headers = {
        "X-RapidAPI-Key": "0c68cc2274msh3b4f58594c8fe7ep16a643jsn9d4d20c7a58f",
        "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
    }
    response = requests.get(url, headers=headers, params=querystring)
    content = response.json()
    # try:
    movie_list = []
    for movie in content["results"]:
        image = movie["primaryImage"]
        if image != None:
            films = {
                "image": movie["primaryImage"]["url"],
                "title": movie["originalTitleText"]["text"],
                "release_year": movie["releaseDate"]["year"],
            }

            movie_list.append(films)
    return {"results": movie_list}
    # except (KeyError, IndexError):
    #     return None


def get_title(id):
    url = f"https://moviesdatabase.p.rapidapi.com/titles/{id}"
    headers = {
        "X-RapidAPI-Key": "0c68cc2274msh3b4f58594c8fe7ep16a643jsn9d4d20c7a58f",
        "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
    }
    response = requests.get(url, headers=headers)

    content = response.json()

    return {
        "image": content["results"]["primaryImage"]["url"],
        "title": content["results"]["originalTitleText"]["text"],
        "release_date": content["results"]["releaseDate"],
    }
