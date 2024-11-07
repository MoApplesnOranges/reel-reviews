import os
from psycopg_pool import ConnectionPool

os.environ["DATABASE_URL"] = "postgresql://example_user:password@postgres/example_db"
# db_url = os.environ.get("DATABASE_URL")

pool = ConnectionPool(conninfo=os.environ.get("DATABASE_URL"))
