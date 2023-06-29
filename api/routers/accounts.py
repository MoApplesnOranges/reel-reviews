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
from queries.accounts import (
    DuplicateAccountError,
    AccountIn,
    AccountOut,
    AccountOutWithPassword,
    AccountRepository,
    Error,
)

router = APIRouter()


class AccountForm(BaseModel):
    username: str
    password: str


class AccountToken(Token):
    account: AccountOut


class HttpError(BaseModel):
    detail: str


@router.post("/api/accounts", response_model=AccountToken | HttpError)
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    repo: AccountRepository = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        account = repo.create(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountForm(username=info.email, password=info.password)
    token = await authenticator.login(response, request, form, repo)
    return AccountToken(account=account, **token.dict())


@router.get("/accounts", response_model=Union[List[AccountOut], Error])
def get_all_accounts(
    repo: AccountRepository = Depends(),
):
    return repo.get_all_accounts()


@router.get("/accounts/{account_id}", response_model=Optional[AccountOut])
def get_one_account(
    account_id: int,
    response: Response,
    repo: AccountRepository = Depends(),
) -> AccountOut:
    account = repo.get_one_account(account_id)
    if account is None:
        response.status_code = 404
    return account


@router.post("/accounts", response_model=Union[AccountOut, Error])
def create_account(
    account: AccountIn,
    response: Response,
    repo: AccountRepository = Depends(),
):
    created = repo.create(account)
    if type(created) is dict:
        response.status_code = 400
    return created


@router.put("/accounts/{account_id}", response_model=Union[AccountOut, Error])
def update_account(
    account_id: int,
    account: AccountIn,
    repo: AccountRepository = Depends(),
) -> Union[Error, AccountOut]:
    return repo.update(account_id, account)


@router.delete("/accounts/{account_id}", response_model=bool)
def delete_account(
    account_id: int,
    repo: AccountRepository = Depends(),
) -> bool:
    return repo.delete(account_id)
