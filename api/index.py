from flask import Flask

app = Flask(__name__)


# Create FastAPI instance
app = FastAPI()


@app.on_event('startup')
def on_startup():
    create_db_and_tables()


@app.get('/api/hello')
def hello():
    return JSONResponse(status_code=status.HTTP_200_OK, content={'message': 'Hello, World!'})
