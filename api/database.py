from dotenv import load_dotenv
from sqlmodel import create_engine, SQLModel, Session
import os

load_dotenv()

DATABASE_URL = os.environ.get("DATABASE_URL_SECRET")

engine = create_engine(DATABASE_URL)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session
