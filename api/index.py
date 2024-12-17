import bcrypt
import jwt
import datetime

from fastapi import FastAPI, status, HTTPException, Response
from fastapi.responses import JSONResponse
from sqlmodel import select
from scalar_fastapi import get_scalar_api_reference

from api.database import create_db_and_tables
from api.dependencies import SessionDependency, JWT_SECRET
from api.models import User, Category, Issue

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

    expiry_date = datetime.datetime.now() + datetime.timedelta(days=1)
    token = jwt.encode(payload={'exp': expiry_date, 'username': db_user.username}, key=JWT_SECRET, algorithm='HS256')

    response = JSONResponse(status_code=status.HTTP_202_ACCEPTED,
                            content={'message': 'Login successful.', 'token': token,
                                     'expires_at': expiry_date.isoformat()})
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


@app.get('/api/user/read')
async def user_read(token: str, session: SessionDependency):
    payload = jwt.decode(token, JWT_SECRET, algorithms=['HS256'])
    statement = select(User).where(User.username == payload['username'])
    result = session.exec(statement)
    db_user = result.first()
    db_user.password = ''
    return db_user


@app.get('/api/user/read/all')
async def user_read_all(session: SessionDependency):
    users = session.exec(select(User)).all()
    for user in users:
        user.password = ''

    return users


@app.get('/api/category/read')
async def category_read(session: SessionDependency):
    categories = session.exec(select(Category)).all()
    return categories


@app.get('/api/issue/read/unassigned')
async def issue_read_unassigned(session: SessionDependency):
    issues = session.exec(select(Issue).where(Issue.assigned_to == None)).all()
    return issues


@app.get('/api/issue/read/all')
async def issue_read_all(session: SessionDependency):
    issues = session.exec(select(Issue)).all()
    return issues


@app.get('/api/issue/read/created')
async def issue_read_created(userid: str, session: SessionDependency):
    issues = session.exec(select(Issue).where(Issue.created_by_id == userid)).all()
    return issues


@app.get('/api/issue/read/assigned')
async def issue_read_created(userid: str, session: SessionDependency):
    issues = session.exec(select(Issue).where(Issue.assigned_to_id == userid)).all()
    return issues


@app.post('/api/issue/create')
async def issue_create(issue: Issue, session: SessionDependency):
    session.add(issue)
    session.commit()
    return JSONResponse(status_code=status.HTTP_202_ACCEPTED, content={'message': 'Issue has been created.'})
