from flask import Flask
from flask_cors import CORS
from database import init_database


def config_app(app: Flask):
    CORS(app, supports_credentials=True, origins=['http://localhost:3000'])
    init_database()
