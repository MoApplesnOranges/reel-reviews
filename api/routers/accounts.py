from fastapi import (
    APIRouter,
    Depends,
    Response,
    HTTPException,
    status,
    Request,
)
import logging
from typing import Optional, Union
from jwtdown_fastapi.authentication import Token
from jwtdownAPI.authenticator import authenticator
from pydantic import BaseModel
from queries.accounts import (
    DuplicateAccountError,
    AccountIn,
    AccountOut,
    AccountRepository,
    Error,
)

router = APIRouter()
logger = logging.getLogger('uvicorn.error')
logger.setLevel(logging.DEBUG)

class AccountForm(BaseModel):
    username: str
    password: str


class AccountToken(Token):
    account: AccountOut


class HttpError(BaseModel):
    detail: str

@router.get("/hello")
async def read_hello():
    logger.debug("Hello Qiu")
    return {"message": "Hello, World!"}


@router.get("/token")
async def get_token(
    request: Request,
    account: AccountIn = Depends(authenticator.try_get_current_account_data),
) -> AccountToken | None:

    logger.debug(request.cookies)
    logger.debug(authenticator.cookie_name)
    logger.debug(account)
    logger.debug(AccountIn)
    logger.debug(authenticator.try_get_current_account_data)
    logger.debug(AccountToken)

    if account and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }
    # else:
    #     raise HTTPException(status_code=401, detail="Unauthorized")

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
    logger.debug(form)
    token = await authenticator.login(response, request, form, repo)
    print(token)
    logger.debug(token)
    return AccountToken(account=account, **token.dict())


# requiring a valid token for accounts
@router.get("/api/accounts/all")
async def retrieve_all_accounts(
    # account_data: dict = Depends(authenticator.get_current_account_data),
    repo: AccountRepository = Depends(),
):
    # if account_data:
    return repo.get_all_accounts()


@router.get(
    "/api/accounts/{account_username}", response_model=Optional[AccountOut]
)
async def get_one_account(
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


@router.put(
    "/api/accounts/{account_id}", response_model=Union[AccountOut, Error]
)
async def update_account(
    account_id: int,
    account: AccountIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: AccountRepository = Depends(),
) -> Union[AccountOut, Error]:
    hashed_password = authenticator.hash_password(account.password)
    if account_data:
        return repo.update(account_id, account, hashed_password)


@router.delete("/api/accounts/{account_id}", response_model=bool)
async def delete_account(
    account_id: int,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: AccountRepository = Depends(),
) -> bool:
    if account_data:
        return repo.delete(account_id)
