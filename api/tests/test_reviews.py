from fastapi.testclient import TestClient
from main import app
from queries.reviews import ReviewRepository
from jwtdownAPI.authenticator import authenticator
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

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


class FetchQueries:
    def get_one_review(self, review_id):
        result = {
            "title": "review title v2",
            "body": "review body v2",
            "rating": True,
            "movie_id": 550,
            "username": "user1",
            "id": 1,
            "posted_time": "2023-07-10T00:00:00",
        }
        return result


def test_get_one_review():
    # Arrange
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    app.dependency_overrides[ReviewRepository] = FetchQueries
    # Act
    response = client.get("/api/movie/550/review/1")
    print(response.json())
    # Cleanup
    app.dependency_overrides = {}
    # Assert
    assert response.status_code == 200
    assert response.json() == {
        "title": "review title v2",
        "body": "review body v2",
        "rating": True,
        "movie_id": 550,
        "username": "user1",
        "id": 1,
        "posted_time": "2023-07-10T00:00:00",
    }


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


class CreateQueries:
    def create(self, json, movie_id):
        result = {
            "title": "Great movie",
            "body": "lots of fun",
            "rating": True,
            "movie_id": 1,
            "account_id": 1,
            "id": 1,
            "posted_time": datetime(year=2023, month=7, day=10),
        }
        result.update(json)
        return result


def test_create_review():
    # arrange
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    app.dependency_overrides[ReviewRepository] = CreateQueries
    json = {
        "title": "Great movie",
        "body": "lots of fun",
        "rating": True,
        "movie_id": 1,
        "account_id": 1,
    }
    expected = {
        "title": "Great movie",
        "body": "lots of fun",
        "rating": True,
        "movie_id": 1,
        "account_id": 1,
        "id": 1,
        "posted_time": "2023-07-10T00:00:00",
    }
    # act
    response = client.post("/api/movie/1/review", json=json)
    print(response.json())
    # cleanup
    app.dependency_overrides = {}
    # assert
    assert response.status_code == 200
    assert response.json() == expected
