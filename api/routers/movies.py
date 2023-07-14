from fastapi import (
    APIRouter,
    Depends,
    Response,
    HTTPException,
    status,
    Request,
)
from Movie_Api.omdb import search_title, get_title, get_new_releases
from queries.movies import MovieIn

router = APIRouter()


@router.get("/api/movies")
async def search(search: str):
    return search_title(search)


@router.get("/api/movie")
async def get_title_id(id: str):
    return get_title(id)


@router.get("/api/movie/new_release")
async def get_new_release(year: str):
    return get_new_releases(year)
