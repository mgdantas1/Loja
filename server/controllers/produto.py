from flask import Blueprint, jsonify, request
from models.produto import Produtos                                                                                       
from database import Session


bp_produto = Blueprint('produto', __name__, url_prefix='/api/produto')


