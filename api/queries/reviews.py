from pydantic import BaseModel
from typing import List, Optional, Union
from queries.pool import pool
from datetime import datetime


class Error(BaseModel):
    message: str


class ReviewIn(BaseModel):
    title: str
    body: str
    rating: bool
    movie_id: int
    account_id: int


class ReviewOut(ReviewIn):
    id: int
    posted_time: datetime


class ReviewOutWithUser(BaseModel):
    title: str
    body: str
    rating: bool
    movie_id: int
    username: str
    id: int
    posted_time: datetime


class ReviewRepository:
    def create(self, review: ReviewIn, movie_id: int) -> ReviewOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO reviews
                        (title, body, rating, movie_id, account_id)
                    VALUES
                        (%s, %s, %s, %s, %s)
                    RETURNING id, posted_time AS posted_time;
                    """,
                    [
                        review.title,
                        review.body,
                        review.rating,
                        movie_id,
                        review.account_id,
                    ],
                )
                row = result.fetchone()
                id = row[0]
                posted_time = row[1]
                return self.review_in_to_out(id, review, posted_time)

    def update(self, review_id: int, review: ReviewIn) -> ReviewOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    UPDATE reviews
                    SET title = %s
                        , body = %s
                        , rating = %s
                        , movie_id = %s
                        , account_id = %s
                    WHERE id = %s
                    """,
                    [
                        review.title,
                        review.body,
                        review.rating,
                        review.movie_id,
                        review.account_id,
                        review_id,
                    ],
                )
                return self.review_in_to_out(review_id, review)

    def get_one_review(self, review_id: int) -> ReviewOutWithUser:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT reviews.id
                    , reviews.title
                    , reviews.body
                    , reviews.posted_time
                    , reviews.rating
                    , reviews.movie_id
                    , accounts.username
                    FROM reviews
                    JOIN accounts ON (accounts.id = reviews.account_id)
                    WHERE reviews.id = %s
                    """,
                    [review_id],
                )
                record = result.fetchone()
                if record is None:
                    return None
                else:
                    return self.record_to_review_out(record)

    def get_all_reviews(self) -> List[ReviewOutWithUser]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT reviews.id
                    , reviews.title
                    , reviews.body
                    , reviews.posted_time
                    , reviews.rating
                    , reviews.movie_id
                    , accounts.username
                    FROM reviews
                    JOIN accounts ON (accounts.id = reviews.account_id)
                    ORDER BY movie_id;
                    """
                )
                return [self.record_to_review_out(record) for record in result]

    def delete(self, review_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM reviews
                        WHERE id = %s
                        """,
                        [review_id],
                    )
                    return True
        except Exception:
            return False

    def review_in_to_out(
        self, id: int, review: ReviewIn, posted_time: datetime
    ):
        old_data = review.dict()
        return ReviewOut(id=id, **old_data, posted_time=posted_time)

    def review_update_to_out(
        self, id: int, review_id: int, movie_id: int, review: ReviewIn
    ):
        old_data = review.dict()
        return ReviewOut(
            id=id, review_id=review_id, movie_id=movie_id, **old_data
        )

    def record_to_review_out(self, record):
        return ReviewOutWithUser(
            id=record[0],
            title=record[1],
            body=record[2],
            posted_time=record[3],
            rating=record[4],
            movie_id=record[5],
            username=record[6],
        )
