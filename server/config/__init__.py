from flask import Flask
from flask_cors import CORS


def config_app(app: Flask):
    CORS(app, origins=['https://localhost:3001'])
