from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import accounts, movies, reviews
import os

from jwtdownAPI.authenticator import authenticator

app = FastAPI()
app.include_router(accounts.router)
app.include_router(authenticator.router)
app.include_router(movies.router)
app.include_router(reviews.router)

origins = [
    "http://localhost:3000",
    os.environ.get("CORS_HOST", None),
]

app.add_middleware(
    CORSMiddleware,
    # allow_origins=[os.environ.get("CORS_HOST", "http://localhost:3000")],
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
