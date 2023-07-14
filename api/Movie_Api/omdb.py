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


# def get_new_releases(year):
#     url = f"http://www.omdbapi.com/?y={year}&s=''&r=json&type=movie&apikey=82116a62"
#     response = requests.get(url)
#     if response.status_code == 200:
#         content = response.json()
#         return content
