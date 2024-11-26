from typing import Annotated
from dotenv import dotenv_values
from fastapi import Depends
from sqlmodel import Session

from api.database import get_session

secrets = dotenv_values('.env')

DATABASE_URL = secrets['NEON_DATABASE_URL']

SessionDependency = Annotated[Session, Depends(get_session)]
