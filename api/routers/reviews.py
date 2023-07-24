from fastapi import (
    APIRouter,
    Depends,
    Response,
    HTTPException,
    status,
    Request,
)
from typing import List, Optional, Union
from jwtdown_fastapi.authentication import Token
from jwtdownAPI.authenticator import authenticator
from pydantic import BaseModel
from queries.reviews import (
    ReviewIn,
    ReviewOut,
    ReviewRepository,
    Error,
)

router = APIRouter()


@router.post("/api/movie/{movie_id}/review", response_model=ReviewOut)
async def create_review(
    info: ReviewIn,
    movie_id: int,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: ReviewRepository = Depends(),
):
    if account_data:
        return repo.create(info, movie_id)


@router.put("/api/movie/{movie_id}/review", response_model=ReviewOut)
async def update_review(
    review_id: int,
    info: ReviewIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: ReviewRepository = Depends(),
):
    if account_data:
        return repo.update(review_id, info)


@router.get(
    "/api/movie/{movie_id}/review/{review_id}",
    response_model=Optional[ReviewOut],
)
async def get_one_review(
    review_id: int,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: ReviewRepository = Depends(),
) -> ReviewOut:
    review = repo.get_one_review(review_id)
    if review is None:
        response.status_code = 404
    elif account_data:
        return review


@router.get("/api/reviews/all")
async def retrieve_all_reviews(
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: ReviewRepository = Depends(),
):
    if account_data:
        return repo.get_all_reviews()


@router.delete("/api/reviews/{review_id}", response_model=bool)
async def delete_review(
    review_id: int,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: ReviewRepository = Depends(),
) -> bool:
    if account_data:
        return repo.delete(review_id)
