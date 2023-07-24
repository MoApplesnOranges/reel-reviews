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
