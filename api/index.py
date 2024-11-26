import bcrypt
from fastapi import FastAPI, status, HTTPException
from fastapi.responses import JSONResponse
from sqlmodel import select
from scalar_fastapi import get_scalar_api_reference

from api.database import create_db_and_tables
from api.dependencies import SessionDependency
from api.models import User

# Create FastAPI instance
app = FastAPI(openapi_url='/api/openapi.json')


@app.on_event('startup')
def on_startup():
    create_db_and_tables()


@app.get('/api/hello')
def hello():
    return JSONResponse(status_code=status.HTTP_200_OK, content={'message': 'Hello, World!'})

@app.get('/api/scalar')
async def scalar_html():
    return get_scalar_api_reference(openapi_url='/api/openapi.json', title='Scalar')


@app.post('/api/register')
async def register(user: User, session: SessionDependency):
    db_user = session.exec(select(User).where(User.username == user.username)).first()
    if db_user:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail='User with this username already exists.')

    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), salt)
    user.password = hashed_password.decode('utf-8')
    session.add(user)
    session.commit()

    return JSONResponse(status_code=status.HTTP_201_CREATED, content={'message': 'User registered successfully.'})
