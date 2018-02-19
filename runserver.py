from os import environ
from server import app

if __name__ == '__main__':
    HOST = environ.get('SERVER_HOST', '0.0.0.0')
    try:
        PORT = int(environ.get('SERVER_PORT', '40000'))
    except ValueError:
        PORT = 40000
    app.run(HOST, PORT)