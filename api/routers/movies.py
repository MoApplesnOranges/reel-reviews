from fastapi import (
    APIRouter,
    Depends,
    Response,
    HTTPException,
    status,
    Request,
)
from Movie_API.omdb import (
    get_new_releases,
    search_title,
    get_title,
    get_movies_by_genre,
)
from queries.movies import MovieIn

router = APIRouter()


@router.get("/api/movies")
async def search(search: str):
    return search_title(search)


@router.get("/api/movie")
async def get_title_id(id: str):
    return get_title(id)


@router.get("/api/movie/new_release")
async def get_new_release():
    return get_new_releases()


@router.get("/api/movie/genre")
async def get_genre(genre_id: int):
    return get_movies_by_genre(genre_id)
