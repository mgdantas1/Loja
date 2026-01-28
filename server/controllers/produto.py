from flask import Blueprint, jsonify, request
from models.produto import Produtos                                                                                       
from database import Session


bp_produto = Blueprint('produto', __name__, url_prefix='/api/produto')


@bp_produto.route('/', methods=['POST'])
def adicionar_produto():
    with Session() as session:
        try:
            data = request.get_json(silent=True)
            if data is None:
                return jsonify({'ok': False, 'message': 'As informações não foram recebidas'}), 401

            new_produto = Produtos(titulo=data['titulo'], tipo=data['tipo'], status=True, quantidade=data['quantidade'], preco=data['preco'])
            session.add(new_produto)
            session.commit()
            return jsonify({'ok': True, 'message': f'{data["tipo"]} adicionado com sucesso'}), 200
        
        except:
            session.rollback()
            return jsonify({'ok': False, 'message': 'Ocorreu algum erro interno'}), 500
