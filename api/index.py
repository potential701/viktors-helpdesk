from typing import Annotated
from fastapi import FastAPI, status, Depends
from fastapi.responses import JSONResponse
from sqlmodel import SQLModel, Field, Session, create_engine
from dotenv import dotenv_values

# Load environment variables
secrets = dotenv_values('.env.local')


class User(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    username: str = Field(index=True)
    password: str = Field()
    access_level: str = Field()


# Create SQLAlchemy database engine
database_url = secrets['NEON_DATABASE_URL']
engine = create_engine(database_url)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]

# Create FastAPI instance
app = FastAPI()


@app.on_event('startup')
def on_startup():
    create_db_and_tables()


@app.get('/api/hello')
def hello():
    return JSONResponse(status_code=status.HTTP_200_OK, content={'message': 'Hello, World!'})
