from pydantic import BaseModel
from typing import List, Optional, Union
from queries.pool import pool
import logging

logger = logging.getLogger('uvicorn.error')
logger.setLevel(logging.DEBUG)


class DuplicateAccountError(BaseModel):
    message: str


class Error(BaseModel):
    message: str


class AccountUpdate(BaseModel):
    username: Optional[str]
    email: Optional[str]
    password: Optional[str]
    avatar: Optional[str]


class AccountIn(BaseModel):
    username: str
    email: str
    password: str
    avatar: Optional[str]


class AccountOut(BaseModel):
    id: int
    username: str
    email: str
    avatar: Optional[str]


class AccountOutWithPassword(AccountOut):
    hashed_password: str

class AccountUpdateWithPassword(AccountUpdate):
    hashed_password: str


class AccountRepository:
    def create(
        self, account: AccountIn, hashed_password: str
    ) -> Union[AccountOutWithPassword, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                            INSERT INTO accounts
                                (username, email, avatar, hashed_password)
                            VALUES
                                (%s, %s, %s, %s)
                            RETURNING id;
                            """,
                        [
                            account.username,
                            account.email,
                            account.avatar,
                            hashed_password,
                        ],
                    )
                    id = result.fetchone()[0]
                    return self.account_in_to_out(id, account)
        except Exception:
            return {"message": "Create did not work"}

    def update(
        self, account_id: int, account: AccountUpdate, hashed_password: str
    ) -> Union[AccountUpdateWithPassword, Error]:
        try:
            logger.debug(f"this account: {account}")
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE accounts
                        SET username = %s
                            , email = %s
                            , hashed_password = %s
                            , avatar = %s
                        WHERE id = %s
                        RETURNING id;
                        """,
                        [
                            account.username,
                            account.email,
                            hashed_password,
                            account.avatar,
                            account_id,
                        ],
                    )
                    return self.updated_account_in_to_out(account_id, account, hashed_password)
        except Exception as e:
            return Error(message="Could not update account", details=str(e))


    def get_one_account(
        self, username: str
    ) -> Optional[AccountOutWithPassword]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                            , username
                            , email
                            , avatar
                            , hashed_password
                        FROM accounts
                        WHERE username = %s
                        """,
                        [username],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_account_out_with_pw(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that account"}

    def get_all_accounts(self) -> Union[Error, List[AccountOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, username, email, avatar
                        FROM accounts
                        ORDER BY username;
                        """
                    )
                    return [
                        self.record_to_account_out_without_pw(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all accounts"}

    def delete(self, account_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM accounts
                        WHERE id = %s
                        """,
                        [account_id],
                    )
                    return True
        except Exception:
            return False

    def updated_account_in_to_out(self, account_id: int, account: AccountUpdate, hashed_password: str):
        old_data = account.dict()
        logger.debug(old_data)
        return AccountUpdateWithPassword(account_id=account_id, **old_data, hashed_password=hashed_password)

    def account_in_to_out(self, id: int, account: AccountIn):
        old_data = account.dict()
        return AccountOut(id=id, **old_data)

    def record_to_account_out_with_pw(self, record):
        return AccountOutWithPassword(
            id=record[0],
            username=record[1],
            email=record[2],
            avatar=record[3],
            hashed_password=record[4],
        )

    def record_to_account_out_without_pw(self, record):
        return AccountOut(
            id=record[0],
            username=record[1],
            email=record[2],
            avatar=record[3],
        )
