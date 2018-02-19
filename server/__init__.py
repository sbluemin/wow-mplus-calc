from flask import Flask

app = Flask(__name__, static_folder='../client/dist/', static_path='')

import server.views