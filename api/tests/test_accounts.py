from fastapi.testclient import TestClient
from main import app
from queries.accounts import AccountRepository
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


class EmptyAccountRepository:
    def get_all_accounts(self):
        return {"accounts": []}


def test_retrieve_all_accounts():
    # Arrange
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    app.dependency_overrides[AccountRepository] = EmptyAccountRepository
    # Act
    response = client.get("/api/accounts/all")
    # Clean up
    app.dependency_overrides = {}
    # Assert
    assert response.status_code == 200
    assert response.json() == {"accounts": []}
