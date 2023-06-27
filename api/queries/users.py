from pydantic import BaseModel
from typing import List, Optional, Union
from queries.pool import pool


class Error(BaseModel):
    message: str


class UserIn(BaseModel):
    username: str
    email: str
    password: str
    first_name: str
    last_name: str
    avatar: Optional[str]


class UserOut(BaseModel):
    id: int
    username: str
    email: str
    password: str
    first_name: str
    last_name: str
    avatar: Optional[str]


class UserRepository:
    def get_one_user(self, user_id: int) -> Optional[UserOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                          SELECT id
                            , username
                            , email
                            , password
                            , first_name
                            , last_name
                            , avatar
                          FROM users
                          WHERE id = %s
                          """,
                        [user_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_user_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that user"}

    def get_all_users(self) -> Union[Error, List[UserOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
            SELECT id, username, email, password, first_name, last_name, avatar
            FROM users
            ORDER BY username;
            """
                    )
                    return [
                        self.record_to_user_out(record) for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all users"}

    def delete(self, user_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM users
                        WHERE id = %s
                        """,
                        [user_id],
                    )
                    return True
        except Exception:
            return False

    def update(self, user_id: int, user: UserIn) -> Union[UserOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE users
                        SET username = %s
                          , email = %s
                          , password = %s
                          , first_name = %s
                          , last_name = %s
                          , avatar = %s
                        WHERE id = %s
                        """,
                        [
                            user.username,
                            user.email,
                            user.password,
                            user.first_name,
                            user.last_name,
                            user.avatar,
                            user_id,
                        ],
                    )
                    return self.user_in_to_out(user_id, user)
        except Exception:
            return {"message": "Could not update that user"}

    def create(self, user: UserIn) -> Union[UserOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                          INSERT INTO users
                            (username, email, password, first_name, last_name, avatar)
                          VALUES
                            (%s, %s, %s, %s, %s, %s)
                          RETURNING id;
                          """,
                        [
                            user.username,
                            user.email,
                            user.password,
                            user.first_name,
                            user.last_name,
                            user.avatar,
                        ],
                    )
                    id = result.fetchone()[0]
                    return self.user_in_to_out(id, user)
        except Exception:
            return {"message": "Create did not work"}

    def user_in_to_out(self, id: int, user: UserIn):
        old_data = user.dict()
        return UserOut(id=id, **old_data)

    def record_to_user_out(self, record):
        return UserOut(
            id=record[0],
            username=record[1],
            email=record[2],
            password=record[3],
            first_name=record[4],
            last_name=record[5],
            avatar=record[6],
        )
