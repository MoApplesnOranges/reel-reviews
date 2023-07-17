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


@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: AccountIn = Depends(authenticator.try_get_current_account_data),
) -> AccountToken | None:
    if account and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }


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
    form = AccountForm(username=info.username, password=info.password)
    print(form)
    token = await authenticator.login(response, request, form, repo)
    print(token)
    return AccountToken(account=account, **token.dict())


# requiring a valid token for accounts
@router.post("/api/accounts/all")
async def retreive_all_accounts(
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: AccountRepository = Depends(),
):
    if account_data:
        return repo.get_all_accounts()


@router.get(
    "/api/accounts/{account_username}", response_model=Optional[AccountOut]
)
def get_one_account(
    account_username: str,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: AccountRepository = Depends(),
) -> AccountOut:
    account = repo.get_one_account(account_username)
    if account is None:
        response.status_code = 404
    elif account_data:
        return account


# @router.put("/accounts/{account_id}", response_model=Union[AccountOut, Error])
# def update_account(
#     account_id: int,
#     account: AccountIn,
#     repo: AccountRepository = Depends(),
# ) -> Union[Error, AccountOut]:
#     return repo.update(account_id, account)


@router.delete("/api/accounts/{account_id}", response_model=bool)
def delete_account(
    account_id: int,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: AccountRepository = Depends(),
) -> bool:
    if account_data:
        return repo.delete(account_id)
