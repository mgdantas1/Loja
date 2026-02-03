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

            new_produto = Produtos(titulo=data['titulo'], tipo=data['tipo'],
                                   status=True, quantidade=data['quantidade'], preco=data['preco'])
            session.add(new_produto)
            session.commit()
            return jsonify({'ok': True, 'message': f'{data["tipo"]} adicionado com sucesso'}), 200

        except:
            session.rollback()
            return jsonify({'ok': False, 'message': 'Ocorreu algum erro interno'}), 500


@bp_produto.route('/', methods=['GET'])
def listar_produto():
    with Session() as session:
        try:
            produtos = session.query(Produtos).all()
            lista = []
            for p in produtos:
                lista.append(p.transformar_dic())
            return jsonify({'ok': True, 'produtos': lista}), 200

        except:
            return jsonify({'ok': False, 'message': 'Ocorreu algum erro interno'}), 500


@bp_produto.route('/<int:id>', methods=['PUT'])
def editar_produto(id):
    with Session() as session:
        try:
            data = request.get_json(silent=True)
            if data is None:
                return jsonify({'ok': False, 'message': 'As informações não foram recebidas'}), 401

            produto = session.get(Produtos, id)
            if produto:
                produto.titulo = data.get('titulo')
                produto.tipo = data.get('tipo')
                produto.quantidade = data.get('quantidade')
                produto.preco = data.get('preco')

                session.commit()
                return jsonify({'ok': True, 'message': 'Atualizações registradas'}), 200

            return jsonify({'ok': False, 'message': 'Produto não encontrado'}), 404

        except:
            session.rollback()
            return jsonify({'ok': False, 'message': 'Ocorreu um erro interno'}), 500


@bp_produto.route('/<int:id>', methods=['DELETE'])
def deletar_produto(id):
    try:
        with Session() as session:
            produto = session.get(Produtos, id)
            session.delete(produto)
            session.commit()
            return jsonify({'ok': True, 'message': 'Produto deletado com sucesso'}), 200
    except:
        session.rollback()
        return jsonify({'ok': False, 'message': 'Ocorreu um erro interno'}), 500
