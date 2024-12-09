from typing import Annotated
from dotenv import load_dotenv
from fastapi import Depends
from sqlmodel import Session
import os

from api.database import get_session

load_dotenv()

DATABASE_URL = os.environ.get("DATABASE_URL_SECRET")
JWT_SECRET = os.environ.get("JWT_SECRET")

SessionDependency = Annotated[Session, Depends(get_session)]
