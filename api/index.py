import bcrypt
import jwt
import datetime

from fastapi import FastAPI, status, HTTPException, Response
from fastapi.responses import JSONResponse
from sqlmodel import select
from scalar_fastapi import get_scalar_api_reference

from api.database import create_db_and_tables
from api.dependencies import SessionDependency, JWT_SECRET
from api.models import User

# Create FastAPI instance
app = FastAPI(openapi_url='/api/openapi.json')


@app.on_event('startup')
def on_startup():
    create_db_and_tables()


@app.get('/api/hello')
def hello():
    return JSONResponse(status_code=status.HTTP_200_OK, content={'message': 'Hello, World!'})


@app.get('/api/docs')
async def docs():
    return get_scalar_api_reference(openapi_url='/api/openapi.json', title='Scalar')


@app.post('/api/auth/register')
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


@app.post('/api/auth/login')
async def login(user: User, session: SessionDependency):
    db_user = session.exec(select(User).where(User.username == user.username)).first()
    if not db_user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='User not found.')

    is_password_correct = bcrypt.checkpw(user.password.encode('utf-8'), db_user.password.encode('utf-8'))
    if not is_password_correct:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Username or password is incorrect.')

    expiry_date = datetime.datetime.now() + datetime.timedelta(minutes=2)
    token = jwt.encode(payload={'exp': expiry_date, 'username': db_user.username}, key=JWT_SECRET, algorithm='HS256')

    response =  JSONResponse(status_code=status.HTTP_202_ACCEPTED,
                        content={'message': 'Login successful.', 'token': token, 'expires_at': expiry_date.isoformat()})
    response.set_cookie(key='auth_token', value=token, expires=expiry_date.astimezone(datetime.timezone.utc))
    return response



@app.get('/api/auth/verify')
async def verify(token: str, session: SessionDependency):
    try:
        payload = jwt.decode(token, key=JWT_SECRET, algorithms=['HS256'])
        db_user = session.exec(select(User).where(User.username == payload['username'])).first()
        if not db_user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='User not found.')

        return JSONResponse(status_code=status.HTTP_200_OK, content={'message': 'Token is valid.'})
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Token has expired.')
    except:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Token is invalid.')
