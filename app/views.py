from flask import render_template
from app import appServer

@appServer.route('/')
def index():
    return appServer.send_static_file('index.html')
