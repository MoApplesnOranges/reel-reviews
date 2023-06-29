steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE accounts (
            id SERIAL PRIMARY KEY NOT NULL,
            username VARCHAR(20) UNIQUE NOT NULL,
            email VARCHAR(50) UNIQUE NOT NULL,
            avatar VARCHAR(256),
            hashed_password VARCHAR(200) NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE accounts;
        """,
    ]
]
