from fastapi import (
    APIRouter,
    Depends,
    Response,
    HTTPException,
    status,
    Request,
)
from Movie_Api.omdb import search_title
from queries.movies import MovieIn

router = APIRouter()


@router.get("/api/movies")
async def search(search: str):
    return search_title(search)
