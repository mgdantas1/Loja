from flask import Flask
from controllers.produto import bp_produto
from config import config_app


app = Flask(__name__)
config_app(app)

# Blueprints
app.register_blueprint(bp_produto)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)