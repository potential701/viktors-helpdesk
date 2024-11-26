from dotenv import dotenv_values
from sqlmodel import create_engine, SQLModel, Session

secrets = dotenv_values('.env')

DATABASE_URL = secrets['NEON_DATABASE_URL']

engine = create_engine(DATABASE_URL)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session
