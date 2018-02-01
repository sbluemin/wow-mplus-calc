from os import environ
from app import app

if __name__ == '__main__':
    HOST = environ.get('SERVER_HOST', 'localhost')
    try:
        PORT = int(environ.get('SERVER_PORT', '40000'))
    except ValueError:
        PORT = 40000
    app.run(HOST, PORT)