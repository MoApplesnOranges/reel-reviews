steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE reviews (
            id SERIAL PRIMARY KEY NOT NULL,
            title VARCHAR(100) NOT NULL,
            body TEXT NOT NULL,
            posted_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            rating BOOLEAN NOT NULL,
            movie_id VARCHAR(20) NOT NULL,
            account_id INT NOT NULL REFERENCES accounts(id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE reviews;
        """,
    ]
]
