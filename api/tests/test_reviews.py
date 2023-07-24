from fastapi.testclient import TestClient
from main import app
from queries.reviews import ReviewRepository
from jwtdownAPI.authenticator import authenticator
from pydantic import BaseModel
from typing import Optional

client = TestClient(app)


class AccountOut(BaseModel):
    id: int
    username: str
    email: str
    avatar: Optional[str]


def fake_get_current_account_data():
    return AccountOut(
        id=1, username="user1", email="user1@gmail.com", avatar="avatar"
    )


class EmptyReviewRepository:
    def get_all_reviews(self):
        return {"reviews": []}


class CreateQueries:
    def create(self, json, movie_id):
        result = {
            "title": "Great movie",
            "body": "lots of fun",
            "posted_time": "2023-07-24T21:39:41.618000+00:00",
            "rating": True,
            "movie_id": "tt0137523",
            "account_id": 1,
            "id": 1,
        }
        result.update(json)
        return result


def test_retrieve_all_reviews():
    # arrange
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    app.dependency_overrides[ReviewRepository] = EmptyReviewRepository
    # act
    response = client.get("/api/reviews/all")
    # cleanup
    app.dependency_overrides = {}
    # assert
    assert response.status_code == 200
    assert response.json() == {"reviews": []}


def test_create_review():
    # arrange
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    app.dependency_overrides[ReviewRepository] = CreateQueries
    json = {
        "title": "Great movie",
        "body": "lots of fun",
        "posted_time": "2023-07-24T21:39:41.618000+00:00",
        "rating": True,
        "movie_id": "tt0137523",
        "account_id": 1,
    }
    expected = {
        "title": "Great movie",
        "body": "lots of fun",
        "posted_time": "2023-07-24T21:39:41.618000+00:00",
        "rating": True,
        "movie_id": "tt0137523",
        "account_id": 1,
        "id": 1,
    }
    # act
    response = client.post("/api/movie/{movie_id}/review", json=json)
    # cleanup
    app.dependency_overrides = {}
    # assert
    assert response.status_code == 200
    assert response.json() == expected
