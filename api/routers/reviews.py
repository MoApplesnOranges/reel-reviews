from datetime import datetime
from fastapi import (
    APIRouter,
    Depends,
    Response,
)
from typing import Optional
from jwtdownAPI.authenticator import authenticator
from queries.reviews import (
    ReviewIn,
    ReviewOut,
    ReviewRepository,
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
    info: ReviewIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: ReviewRepository = Depends(),
):
    if account_data:
        return repo.update(info)


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


@router.get("/api/movie/{movie_id}/reviews/all")
async def get_all_movie_reviews(
    movie_id: int,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: ReviewRepository = Depends(),
):
    if account_data:
        return repo.get_reviews_by_movie_id(movie_id)


@router.get("/api/reviews/all")
async def retrieve_all_reviews(
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: ReviewRepository = Depends(),
):
    if account_data:
        return repo.get_all_reviews()


@router.get("/api/reviews/all/loggedout")
async def no_token_retrieve_all_reviews(
    repo: ReviewRepository = Depends(),
):
    return repo.get_all_reviews()


@router.delete("/api/reviews/{review_id}", response_model=bool)
async def delete_review(
    review_id: int,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: ReviewRepository = Depends(),
) -> bool:
    if account_data:
        return repo.delete(review_id)
